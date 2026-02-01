import React, { useEffect, useState } from 'react';
import { Box, Text } from 'ink';
import Spinner from 'ink-spinner';
import { MultiSelect } from '../components/MultiSelect.js';
import { fetchPrompts, Prompt } from '../lib/api.js';
import { findTargetFile, injectPrompts } from '../lib/files.js';

export const Pull = () => {
    const [loading, setLoading] = useState(true);
    const [prompts, setPrompts] = useState<Prompt[]>([]);
    const [error, setError] = useState('');
    const [done, setDone] = useState(false);
    const [targetFile, setTargetFile] = useState<string>('');
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    useEffect(() => {
        fetchPrompts().then(data => {
            setPrompts(data);
            setLoading(false);
        }).catch(err => {
            setError(err.message);
            setLoading(false);
        });
    }, []);

    const handleSubmit = async (values: string[]) => {
        if (values.length === 0) return;

        const selectedPrompts = prompts.filter(p => values.includes(p.id));
        setLoading(true);
        try {
            const file = await findTargetFile();
            if (file) {
                await injectPrompts(file, selectedPrompts);
                setTargetFile(file);
                setDone(true);
            } else {
                setError('Could not find a target file (.cursorrules or similar).');
            }
        } catch (e: any) {
            setError(e.message);
        }
        setLoading(false);
    };

    if (loading) {
        return <Text><Spinner type="dots" /> {prompts.length === 0 ? 'Fetching available prompts...' : 'Injecting selected prompts...'}</Text>;
    }

    if (error) {
        return (
            <Box flexDirection="column">
                <Text color="red">✖ Error: {error}</Text>
                <Text color="gray">Try running `arsenal login` again.</Text>
            </Box>
        );
    }

    if (done) {
        return (
            <Box flexDirection="column">
                <Text color="green">✔ Successfully injected {selectedIds.length} prompts into {targetFile}</Text>
                <Text color="gray">Restart your IDE to apply changes.</Text>
            </Box>
        );
    }

    const items = prompts.map(p => ({
        label: `${p.name} (${p.category})`,
        value: p.id
    }));

    return (
        <Box flexDirection="column">
            <Text bold color="blue"> Select prompts to inject (Space to toggle, Enter to submit):</Text>
            <Box marginTop={1}>
                {items.length > 0 ? (
                    <MultiSelect
                        items={items}
                        onSubmit={handleSubmit}
                        onSelect={(item) => setSelectedIds(prev => [...prev, item.value])}
                    />
                ) : (
                    <Text>No prompts found.</Text>
                )}
            </Box>
        </Box>
    );
};
