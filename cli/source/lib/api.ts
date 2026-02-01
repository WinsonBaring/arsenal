import { getAuthToken } from './config.js';

const API_URL = process.env['API_URL'] || 'http://localhost:3000/api';

export interface Prompt {
    id: string;
    name: string;
    content: string;
    category: string;
}

const getHeaders = () => {
    const token = getAuthToken();
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
};

export const verifyToken = async (token: string): Promise<boolean> => {
    try {
        // Verify against /me endpoint or similar. For now, we'll try to fetch prompts as a proxy for "valid token"
        // In a real app, use a dedicated /auth/verify endpoint.
        const res = await fetch(`${API_URL}/prompts`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return res.ok;
    } catch (error) {
        return false;
    }
}

export const fetchPrompts = async (): Promise<Prompt[]> => {
    try {
        const res = await fetch(`${API_URL}/prompts`, {
            headers: getHeaders()
        });
        if (!res.ok) throw new Error(await res.text());
        return await res.json() as Prompt[];
    } catch (error) {
        console.error("Failed to fetch prompts:", error);
        throw error; // Re-throw to handle in UI
    }
};
