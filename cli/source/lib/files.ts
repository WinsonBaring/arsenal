import fs from 'fs-extra';
import path from 'path';
import { exec } from 'child_process';
import util from 'util';

const execAsync = util.promisify(exec);

export type AgentType = 'antigravity' | 'cursor' | 'windsurf' | 'claude';

export const getAgentPath = (agent: AgentType, basePath: string = process.cwd()): string => {
    switch (agent) {
        case 'antigravity': return path.join(basePath, '.agent', 'rules.md');
        case 'cursor': return path.join(basePath, '.cursorrules');
        case 'windsurf': return path.join(basePath, '.windsurf', 'rules.md');
        case 'claude': return path.join(basePath, '.claude', 'rules.md');
        default: return path.join(basePath, '.cursorrules');
    }
};

export const findTargetFile = async (targetPath?: string): Promise<string | null> => {
    const filePath = targetPath || path.join(process.cwd(), '.cursorrules');
    // Ensure directory exists if we are calculating it
    const dir = path.dirname(filePath);
    if (!await fs.pathExists(dir)) {
        await fs.mkdirp(dir);
    }
    // Create file if it doesn't exist
    if (!await fs.pathExists(filePath)) {
        await fs.writeFile(filePath, '');
    }
    return filePath;
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

export const installSkill = async (repoUrl: string, skillName: string, targetBase: string = process.cwd()) => {
    // 1. Create temp directory
    const tempDir = path.join(targetBase, '.arsenal-temp-' + Date.now());
    await fs.mkdirp(tempDir);

    try {
        // 2. Clone repo (shallow)
        // We use git clone because it's reliable.
        // In a real app we might use the GitHub API to avoid git dependency, but standard dev environment has git.
        await execAsync(`git clone --depth 1 ${repoUrl} ${tempDir}`);

        // 3. Find the skill folder
        // If skillName is provided, look for it in the checked out repo
        // If the user provided a full path in the repo like "skills/react", we handle that traverse.
        // For simplicity, we assume the user might provide the path *within* the repo as the skill name,
        // or we search for it.
        // Let's assume skillName IS the path within the repo for now to be precise.

        const sourcePath = path.join(tempDir, skillName);

        if (!await fs.pathExists(sourcePath)) {
            throw new Error(`Skill path "${skillName}" not found in repository.`);
        }

        // 4. Move to destination
        // Destination: .agent/skills/<basename_of_skill>
        const destDir = path.join(targetBase, '.agent', 'skills', path.basename(skillName));
        await fs.mkdirp(path.dirname(destDir));
        await fs.copy(sourcePath, destDir, { overwrite: true });

        return destDir;
    } finally {
        // Cleanup
        await fs.remove(tempDir);
    }
};

export const checkGlobalInstall = async (): Promise<boolean> => {
    try {
        // Check if 'arsenal' command exists
        await execAsync('which arsenal');
        return true;
    } catch {
        return false;
    }
};

export const installGlobal = async () => {
    // We can't easily sudo from inside here without breaking UI, 
    // so we will just run the command and hope user has permissions or it prompts.
    // Actually, `npm install -g` often requires sudo. 
    // Safer: return the command string for the UI to display, OR try to run it.
    // Let's try to run it.
    await execAsync('npm install -g arsenal');
};
