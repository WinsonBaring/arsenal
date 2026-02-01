import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';

export interface Item {
    label: string;
    value: string;
}

interface MultiSelectProps {
    items: Item[];
    onSubmit: (values: string[]) => void;
    onSelect?: (item: Item) => void;
}

export const MultiSelect = ({ items, onSubmit, onSelect }: MultiSelectProps) => {
    const [focusedIndex, setFocusedIndex] = useState(0);
    const [selectedIndices, setSelectedIndices] = useState<Set<number>>(new Set());

    useInput((input, key) => {
        if (key.upArrow) {
            setFocusedIndex(i => Math.max(0, i - 1));
        }
        if (key.downArrow) {
            setFocusedIndex(i => Math.min(items.length - 1, i + 1));
        }
        if (input === ' ') {
            const newSelected = new Set(selectedIndices);
            if (newSelected.has(focusedIndex)) {
                newSelected.delete(focusedIndex);
            } else {
                newSelected.add(focusedIndex);
            }
            setSelectedIndices(newSelected);
            const item = items[focusedIndex];
            if (onSelect && item) onSelect(item);
        }
        if (key.return) {
            const result = items.filter((_, i) => selectedIndices.has(i)).map(item => item.value);
            onSubmit(result);
        }
    });

    return (
        <Box flexDirection="column">
            {items.map((item, index) => {
                const isFocused = index === focusedIndex;
                const isSelected = selectedIndices.has(index);
                const prefix = isFocused ? <Text color="blue">❯ </Text> : <Text>  </Text>;
                const checkbox = isSelected ? <Text color="green">◉ </Text> : <Text color="gray">◯ </Text>;

                return (
                    <Box key={item.value}>
                        {prefix}
                        {checkbox}
                        <Text color={isFocused ? 'blue' : undefined}>{item.label}</Text>
                    </Box>
                );
            })}
            <Box marginTop={1}>
                <Text color="gray">Press Space to toggle, Enter to submit</Text>
            </Box>
        </Box>
    );
};
