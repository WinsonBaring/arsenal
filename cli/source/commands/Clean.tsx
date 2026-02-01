import React, { useEffect, useState } from 'react';
import { Box, Text } from 'ink';
import { findTargetFile, removePrompts } from '../lib/files.js';

export const Clean = () => {
    const [status, setStatus] = useState('cleaning');
    const [file, setFile] = useState('');

    useEffect(() => {
        findTargetFile().then(async f => {
            if (f) {
                setFile(f);
                const removed = await removePrompts(f);
                setStatus(removed ? 'success' : 'no-op');
            } else {
                setStatus('error');
            }
        });
    }, []);

    return (
        <Box flexDirection="column">
            {status === 'cleaning' && <Text>Cleaning...</Text>}
            {status === 'success' && <Text color="green">✔ Successfully removed Arsenal block from {file}</Text>}
            {status === 'no-op' && <Text color="yellow">No Arsenal block found in {file}</Text>}
            {status === 'error' && <Text color="red">Could not find a target file.</Text>}
        </Box>
    );
};
