import React, { useState, useEffect } from 'react';
import { Box, Text, useApp, useInput } from 'ink';
import Spinner from 'ink-spinner';
import { installSkill, checkGlobalInstall, installGlobal } from '../lib/files.js';

interface Props {
    repoUrl: string;
    skillPath?: string;
}

export const Add = ({ repoUrl, skillPath }: Props) => {
    const { exit } = useApp();
    const [status, setStatus] = useState<'cloning' | 'success' | 'bootstrap' | 'installing_global' | 'done'>('cloning');
    const [error, setError] = useState<string | null>(null);
    const [installedPath, setInstalledPath] = useState('');

    useEffect(() => {
        const run = async () => {
            if (!repoUrl) {
                setError('Repository URL is required. Usage: arsenal add <url> --skill <path>');
                return;
            }
            if (!skillPath) {
                // Determine behavior if no skill path (maybe install root?)
                // For now, enforce skill path based on user request "add --skill"
                setError('Skill path is required via --skill flag.');
                return;
            }

            try {
                const dest = await installSkill(repoUrl, skillPath);
                setInstalledPath(dest);

                // Check if we need bootstrap
                const isGlobal = await checkGlobalInstall();
                if (isGlobal) {
                    setStatus('done');
                    setTimeout(() => exit(), 1500);
                } else {
                    setStatus('bootstrap');
                }
            } catch (e: any) {
                setError(e.message);
            }
        };
        run();
    }, [repoUrl, skillPath]);

    useInput(async (input) => {
        if (status === 'bootstrap') {
            if (input.toLowerCase() === 'y' || input === '\r') {
                setStatus('installing_global');
                try {
                    await installGlobal();
                    setStatus('done');
                    setTimeout(() => exit(), 2000);
                } catch (e: any) {
                    setError(`Global install failed: ${e.message}. Try running 'npm install -g arsenal'.`);
                }
            } else if (input.toLowerCase() === 'n') {
                setStatus('done');
                setTimeout(() => exit(), 1000);
            }
        }
    });

    if (error) {
        return <Text color="red">Error: {error}</Text>;
    }

    if (status === 'cloning') {
        return <Text color="yellow"><Spinner type="dots" /> Fetching skill from {repoUrl}...</Text>;
    }

    if (status === 'bootstrap') {
        return (
            <Box flexDirection="column">
                <Text color="green">✔ Skill installed to {installedPath}</Text>
                <Box borderStyle="round" borderColor="cyan" padding={1}>
                    <Text bold>Arsenal is not installed globally.</Text>
                    <Text>Would you like to install it now for easier access? (Y/n)</Text>
                </Box>
            </Box>
        );
    }

    if (status === 'installing_global') {
        return <Text color="cyan"><Spinner type="dots" /> Installing Arsenal globally (this may take a moment)...</Text>;
    }

    return (
        <Box flexDirection="column">
            <Text color="green">✔ All Done!</Text>
        </Box>
    );
};
