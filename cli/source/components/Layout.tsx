import React from 'react';
import { Box, Text } from 'ink';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';

interface LayoutProps {
    children: React.ReactNode;
    step?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, step }) => {
    return (
        <Box flexDirection="column" padding={1} borderStyle="round" borderColor="blue">
            <Box marginBottom={1} flexDirection="column">
                <Gradient name="pastel">
                    <BigText text="Arsenal" font="tiny" />
                </Gradient>
                <Box justifyContent="space-between">
                    <Text color="gray">Detected: Cursor Agent</Text>
                    {step && <Text color="blue">Step: {step}</Text>}
                </Box>
            </Box>

            <Box flexDirection="column" paddingX={1}>
                {children}
            </Box>

            <Box marginTop={1} borderStyle="single" borderTop={true} borderBottom={false} borderLeft={false} borderRight={false} borderColor="gray">
                <Text color="gray" dimColor>Press 'q' to quit • 'Enter' to select</Text>
            </Box>
        </Box>
    );
};
