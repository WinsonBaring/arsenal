import { useState, useEffect } from "react";

export interface Prompt {
    id: string;
    name: string;
    content: string;
    category: string;
    author?: string;
    version: string;
    lastUpdated: string;
}

const STORAGE_KEY = "arsenal_prompts";

const DEFAULT_PROMPTS: Prompt[] = [
    {
        id: "local-1",
        name: "React Expert Guidelines",
        category: "Frontend",
        content: "# React Guidelines\n\n- Use functional components.\n- Prefer hooks.",
        version: "1.0.0",
        lastUpdated: new Date().toISOString(),
    }
];

export function usePrompts() {
    const [prompts, setPrompts] = useState<Prompt[]>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : DEFAULT_PROMPTS;
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts));
    }, [prompts]);

    const addPrompt = (prompt: Prompt) => {
        setPrompts(prev => [prompt, ...prev]);
    };

    const updatePrompt = (id: string, updates: Partial<Prompt>) => {
        setPrompts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    };

    const reinstallPrompt = (promptFromMarketplace: any) => {
        const newPrompt: Prompt = {
            id: promptFromMarketplace.id,
            name: promptFromMarketplace.name,
            category: promptFromMarketplace.tags[0] || "General",
            content: promptFromMarketplace.description + "\n\n(Imported content)",
            author: promptFromMarketplace.author,
            version: "1.0.0",
            lastUpdated: new Date().toISOString(),
        };
        // Avoid duplicates by ID
        if (!prompts.find(p => p.id === newPrompt.id)) {
            addPrompt(newPrompt);
        }
    };

    return { prompts, addPrompt, updatePrompt, reinstallPrompt };
}
