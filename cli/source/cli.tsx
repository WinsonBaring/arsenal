#!/usr/bin/env node
import React, { useState } from 'react';
import { render, Box, Text, useInput } from 'ink';
import { Layout } from './components/Layout.js';
import { Login } from './commands/Login.js';
import { Pull } from './commands/Pull.js';
import { List } from './commands/List.js';
import { Clean } from './commands/Clean.js';
import { Add } from './commands/Add.js';
import meow from 'meow';

const App = ({ command, input, flags }: { command: string, input: string[], flags: any }) => {
	const [activeCommand] = useState(command || 'home');

	useInput((input) => {
		if (input === 'q' && activeCommand === 'home') {
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
			{activeCommand === 'add' && <Add repoUrl={input[1] || ''} skillPath={flags.skill} />}
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
	  add   Install skills (e.g. arsenal add <url> --skill <path>)

	Examples
	  $ arsenal pull
	  $ arsenal login
	  $ arsenal add https://github.com/org/repo --skill my-skill
	`,
	{
		importMeta: import.meta,
		flags: {
			skill: {
				type: 'string',
				shortFlag: 's'
			}
		}
	},
);

render(<App command={cli.input[0] || 'home'} input={cli.input} flags={cli.flags} />);
