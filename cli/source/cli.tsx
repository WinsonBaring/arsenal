#!/usr/bin/env node
import React, { useState } from 'react';
import { render, Box, Text, useInput } from 'ink';
import { Layout } from './components/Layout.js';
import { Login } from './commands/Login.js';
import { Pull } from './commands/Pull.js';
import { List } from './commands/List.js';
import { Clean } from './commands/Clean.js';
import meow from 'meow';

const App = ({ command }: { command: string }) => {
	const [activeCommand] = useState(command || 'home');

	useInput((input) => {
		if (input === 'q') {
			process.exit(0);
		}
	});

	return (
		<Layout step={activeCommand.toUpperCase()}>
			{activeCommand === 'home' && (
				<Box flexDirection="column" gap={1}>
					<Text>Welcome to Arsenal CLI.</Text>
					<Text color="green">Run `arsenal pull` to sync prompts.</Text>
				</Box>
			)}
			{activeCommand === 'pull' && <Pull />}
			{activeCommand === 'login' && <Login />}
			{activeCommand === 'list' && <List />}
			{activeCommand === 'clean' && <Clean />}
		</Layout>
	);
};

const cli = meow(
	`
	Usage
	  $ arsenal <command>

	Commands
	  pull  Fetch and inject prompts
	  login Authenticate with Arsenal
	  list  List installed prompts

	Examples
	  $ arsenal pull
	  $ arsenal login
`,
	{
		importMeta: import.meta,
	},
);

render(<App command={cli.input[0] || 'home'} />);
