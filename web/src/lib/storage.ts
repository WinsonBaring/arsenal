import { useState, useEffect } from "react";

export interface Prompt {
    id: string;
    name: string;
    content: string;
    category: string;
    description?: string;
    author?: string;
    version: string;
    lastUpdated: string;
    tags?: string[];
}

export function usePrompts() {
    const [prompts, setPrompts] = useState<Prompt[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPrompts = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/prompts');
            if (!res.ok) {
                // Fallback if API is not running (e.g. standard vite dev)
                console.warn("API not available, falling back to empty list");
                setError("API not available. Run 'vercel dev' to enable backend.");
                return;
            }
            const data = await res.json();

            setPrompts(data.map((p: any) => ({
                id: p.id,
                name: p.name,
                content: p.content,
                category: p.category || "Uncategorized",
                description: p.description || "",
                author: p.author || "Unknown",
                version: p.version || "1.0.0",
                lastUpdated: p.updated_at || p.created_at || new Date().toISOString(),
                tags: p.tags || []
            })));
            setError(null);
        } catch (err) {
            console.error("Fetch error:", err);
            setError(err instanceof Error ? err.message : "Failed to load prompts");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPrompts();
    }, []);

    const addPrompt = async (prompt: Partial<Prompt>) => {
        try {
            const res = await fetch('/api/prompts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: prompt.name || "Untitled",
                    content: prompt.content || "",
                    category: prompt.category || "General",
                    description: prompt.description || "",
                    author: "User",
                    version: "1.0.0",
                    tags: prompt.tags || []
                }),
            });
            if (!res.ok) throw new Error('Failed to save');
            await fetchPrompts();
            return true;
        } catch (err) {
            console.error(err);
            alert("Failed to save: " + (err instanceof Error ? err.message : "Unknown error"));
            return false;
        }
    };

    const updatePrompt = async (id: string, updates: Partial<Prompt>) => {
        try {
            const res = await fetch('/api/prompts', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, ...updates }),
            });
            if (!res.ok) throw new Error('Failed to update');
            await fetchPrompts();
            return true;
        } catch (err) {
            console.error(err);
            alert("Failed to update");
            return false;
        }
    };

    const reinstallPrompt = async (promptFromMarketplace: any) => {
        await addPrompt({
            name: promptFromMarketplace.name + " (Copy)",
            category: promptFromMarketplace.category,
            content: promptFromMarketplace.content,
            description: promptFromMarketplace.description,
            tags: ["installed"]
        });
    };

    return { prompts, loading, error, addPrompt, updatePrompt, reinstallPrompt, refresh: fetchPrompts };
}
