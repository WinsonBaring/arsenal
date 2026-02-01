import React, { useState } from 'react';
import { Box, Text } from 'ink';
import Spinner from 'ink-spinner';
import TextInput from 'ink-text-input';
import { setAuthToken } from '../lib/config.js';
import { verifyToken } from '../lib/api.js';

export const Login = () => {
    const [token, setToken] = useState('');
    const [status, setStatus] = useState<'input' | 'verifying' | 'success' | 'error'>('input');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (value: string) => {
        setStatus('verifying');
        const isValid = await verifyToken(value);
        if (isValid) {
            setAuthToken(value);
            setStatus('success');
        } else {
            setErrorMsg('Invalid token. Please check your dashboard and try again.');
            setStatus('error');
            // Reset to input after a brief pause or immediately? Let's just stay in error state but allow typing
            setTimeout(() => setStatus('input'), 2000);
        }
    };

    if (status === 'verifying') {
        return (
            <Box>
                <Text color="yellow"><Spinner type="dots" /> Verifying token...</Text>
            </Box>
        );
    }

    if (status === 'success') {
        return (
            <Box flexDirection="column">
                <Text color="green">✔ Successfully logged in!</Text>
                <Text color="gray">Token securely saved. You can now use `arsenal pull`.</Text>
            </Box>
        );
    }

    return (
        <Box flexDirection="column">
            <Text bold>Arsenal Authentication</Text>
            <Text>Please paste your Personal Access Token from the dashboard:</Text>

            <Box marginTop={1}>
                <Text color="green">❯ </Text>
                <TextInput
                    value={token}
                    onChange={setToken}
                    onSubmit={handleSubmit}
                    mask="*" // simple mask for privacy
                />
            </Box>

            {status === 'error' && (
                <Box marginTop={1}>
                    <Text color="red">✖ {errorMsg}</Text>
                </Box>
            )}
        </Box>
    );
};
