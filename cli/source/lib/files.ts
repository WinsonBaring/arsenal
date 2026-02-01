import fs from 'fs-extra';
import path from 'path';

const TARGET_FILES = ['.cursorrules', '.agent/rules.md', '.claude/rules.md', 'rules.md'];

export const findTargetFile = async (): Promise<string | null> => {
    const cwd = process.cwd();
    for (const file of TARGET_FILES) {
        const filePath = path.join(cwd, file);
        if (await fs.pathExists(filePath)) return filePath;
    }
    // Default to creating .cursorrules if nothing exists
    return path.join(cwd, '.cursorrules');
};

export const injectPrompts = async (filePath: string, prompts: { name: string; content: string }[]) => {
    const BEGIN_MARKER = '<!-- BEGIN ARSENAL -->';
    const END_MARKER = '<!-- END ARSENAL -->';

    let content = '';
    try {
        content = await fs.readFile(filePath, 'utf-8');
    } catch (e) {
        // File doesn't exist, start empty
    }

    const injection = prompts.map(p => `### ${p.name}\n${p.content}`).join('\n\n');
    const block = `\n${BEGIN_MARKER}\n\n${injection}\n\n${END_MARKER}\n`;

    const regex = new RegExp(`${BEGIN_MARKER}[\\s\\S]*?${END_MARKER}`, 'g');

    let newContent = content;
    if (regex.test(content)) {
        newContent = content.replace(regex, block);
    } else {
        newContent += block;
    }

    await fs.outputFile(filePath, newContent);
    return filePath;
};

export const removePrompts = async (filePath: string) => {
    const BEGIN_MARKER = '<!-- BEGIN ARSENAL -->';
    const END_MARKER = '<!-- END ARSENAL -->';

    if (!await fs.pathExists(filePath)) return false;

    const content = await fs.readFile(filePath, 'utf-8');
    const regex = new RegExp(`${BEGIN_MARKER}[\\s\\S]*?${END_MARKER}`, 'g');

    if (regex.test(content)) {
        const newContent = content.replace(regex, '');
        await fs.outputFile(filePath, newContent);
        return true;
    }
    return false;
};
