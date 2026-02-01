import Conf from 'conf';
import { z } from 'zod';

const schema = z.object({
    authToken: z.string().optional(),
    projects: z.record(z.string(), z.array(z.string())).default({}), // persistent memory of selections per project path
});

type ConfigSchema = z.infer<typeof schema>;

const config = new Conf<ConfigSchema>({
    projectName: 'arsenal',
    defaults: {
        projects: {}
    }
});

export const getConfig = () => config.store;
export const setAuthToken = (token: string) => config.set('authToken', token);
export const getAuthToken = () => config.get('authToken');
export const saveProjectSelection = (path: string, prompts: string[]) => {
    const current = config.get('projects') || {};
    config.set('projects', { ...current, [path]: prompts });
};
export const getProjectSelection = (path: string) => {
    const current = config.get('projects') || {};
    return current[path] || [];
};
