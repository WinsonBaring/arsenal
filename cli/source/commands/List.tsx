import React, { useEffect, useState } from 'react';
import { Box, Text } from 'ink';
import { findTargetFile } from '../lib/files.js';
import fs from 'fs-extra';

export const List = () => {
    const [file, setFile] = useState<string | null>(null);
    const [content, setContent] = useState<string>('');

    useEffect(() => {
        findTargetFile().then(async f => {
            if (f && await fs.pathExists(f)) {
                setFile(f);
                setContent(await fs.readFile(f, 'utf-8'));
            } else {
                setFile('No target file found');
            }
        });
    }, []);

    const hasArsenalBlock = content.includes('<!-- BEGIN ARSENAL -->');

    return (
        <Box flexDirection="column">
            <Text bold>Target File: <Text color="blue">{file}</Text></Text>
            <Text>Status: {hasArsenalBlock ? <Text color="green">Active (Prompts Injected)</Text> : <Text color="gray">No Arsenal prompts found.</Text>}</Text>
        </Box>
    );
};
