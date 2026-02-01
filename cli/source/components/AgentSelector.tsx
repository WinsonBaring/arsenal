import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';

export type AgentType = 'antigravity' | 'cursor' | 'windsurf' | 'claude';

interface AgentOption {
    label: string;
    value: AgentType;
    description: string;
}

const AGENTS: AgentOption[] = [
    { label: 'Antigravity (.agent)', value: 'antigravity', description: 'Agentic workflow rules' },
    { label: 'Cursor (.cursorrules)', value: 'cursor', description: 'Cursor IDE rules' },
    { label: 'Windsurf (.windsurf)', value: 'windsurf', description: 'Windsurf IDE rules' },
    { label: 'Claude Code (.claude)', value: 'claude', description: 'Claude Code configuration' },
];

interface Props {
    onSelect: (agent: AgentType) => void;
}

export const AgentSelector = ({ onSelect }: Props) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    useInput((_input, key) => {
        if (key.upArrow) {
            setSelectedIndex(i => Math.max(0, i - 1));
        }
        if (key.downArrow) {
            setSelectedIndex(i => Math.min(AGENTS.length - 1, i + 1));
        }
        if (key.return) {
            const agent = AGENTS[selectedIndex];
            if (agent) {
                onSelect(agent.value);
            }
        }
    });

    return (
        <Box flexDirection="column" gap={1}>
            <Text bold color="cyan">Select Target Agent:</Text>
            <Box flexDirection="column">
                {AGENTS.map((agent, index) => (
                    <Box key={agent.value}>
                        <Text color={index === selectedIndex ? 'green' : 'white'}>
                            {index === selectedIndex ? '> ' : '  '}
                            {agent.label}
                        </Text>
                        {index === selectedIndex && (
                            <Text color="gray" dimColor>  - {agent.description}</Text>
                        )}
                    </Box>
                ))}
            </Box>
            <Text dimColor>Use arrow keys to select, Enter to confirm</Text>
        </Box>
    );
};
