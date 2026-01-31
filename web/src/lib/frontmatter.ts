import yaml from "js-yaml";

export interface FrontMatter {
    name?: string;
    category?: string;
    [key: string]: any;
}

export interface ParsedMarkdown {
    data: FrontMatter;
    content: string;
}

export function parseFrontMatter(text: string): ParsedMarkdown {
    const pattern = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = text.match(pattern);

    if (!match) {
        return {
            data: {},
            content: text,
        };
    }

    try {
        const yamlBlock = match[1];
        const content = match[2];
        const data = yaml.load(yamlBlock) as FrontMatter;

        return { data, content };
    } catch (e) {
        console.error("YAML Parse Error", e);
        return {
            data: {},
            content: text, // Fallback returns original text if YAML fails
        };
    }
}
