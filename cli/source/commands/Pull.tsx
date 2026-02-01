import React, { useState, useEffect } from 'react';
import { Box, Text, useApp } from 'ink';
import Spinner from 'ink-spinner';
import { fetchPrompts } from '../lib/api.js';
import { injectPrompts, getAgentPath, AgentType, findTargetFile } from '../lib/files.js';
import { MultiSelect } from '../components/MultiSelect.js';
import { AgentSelector } from '../components/AgentSelector.js';

export const Pull = () => {
    useApp();
    const [step, setStep] = useState<'agent' | 'prompts' | 'injecting' | 'done'>('agent');
    const [loading, setLoading] = useState(false);
    const [prompts, setPrompts] = useState<{ id: string; name: string; content: string }[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [targetAgent, setTargetAgent] = useState<AgentType>('cursor');
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [targetFile, setTargetFile] = useState<string | null>(null);

    useEffect(() => {
        async function loadPrompts() {
            setLoading(true);
            setError(null);
            try {
                const fetchedPrompts = await fetchPrompts();
                setPrompts(fetchedPrompts);
            } catch (err: any) {
                setError(`Failed to fetch prompts: ${err.message}`);
            } finally {
                setLoading(false);
            }
        }

        if (step === 'prompts') {
            loadPrompts();
        }
    }, [step]);

    const handleAgentSelect = async (agentType: AgentType) => {
        setTargetAgent(agentType);
        setLoading(true);
        try {
            const agentPath = getAgentPath(agentType);
            const file = await findTargetFile(agentPath);
            if (file) {
                setTargetFile(file);
                setStep('prompts');
            } else {
                setError(`Could not find target file for agent type: ${agentType}`);
            }
        } catch (err: any) {
            setError(`Error finding agent file: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (values: string[]) => {
        setSelectedIds(values);
        setStep('injecting');
        setLoading(true);
        setError(null);

        try {
            if (!targetFile) {
                const path = getAgentPath(targetAgent);
                const file = await findTargetFile(path);
                if (!file) throw new Error("Target file not determined.");
                setTargetFile(file);

                const promptsToInject = prompts.filter(p => values.includes(p.id));
                await injectPrompts(file, promptsToInject);
            } else {
                const promptsToInject = prompts.filter(p => values.includes(p.id));
                await injectPrompts(targetFile, promptsToInject);
            }
            setStep('done');
        } catch (err: any) {
            setError(`Failed to inject prompts: ${err.message}`);
            setStep('prompts');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Box>
                <Spinner type="dots" />
                <Text> Loading...</Text>
            </Box>
        );
    }

    if (error) {
        return (
            <Box>
                <Text color="red">Error: {error}</Text>
            </Box>
        );
    }

    if (step === 'agent') {
        return (
            <AgentSelector onSelect={handleAgentSelect} />
        );
    }

    if (step === 'injecting') {
        return (
            <Box>
                <Spinner type="dots" />
                <Text> Injecting prompts...</Text>
            </Box>
        );
    }

    if (step === 'done') {
        return (
            <Box flexDirection="column">
                <Text color="green">✔ Successfully injected {selectedIds.length} prompts into {targetFile}</Text>
                <Text color="gray">Restart your IDE to apply changes.</Text>
            </Box>
        );
    }

    return (
        <Box flexDirection="column">
            <Text bold>Select prompts to inject:</Text>
            {prompts.length > 0 ? (
                <MultiSelect
                    items={prompts.map(p => ({ label: p.name, value: p.id, category: 'Code' }))}
                    onSubmit={handleSubmit}
                />
            ) : (
                <Text color="yellow">No prompts found.</Text>
            )}
        </Box>
    );
};
