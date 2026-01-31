import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Save, ArrowLeft, Eye, Code, FileText, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { parseFrontMatter } from "@/lib/frontmatter";

const DEFAULT_CONTENT = `---
name: My New Prompt
category: Coding
---

# Instructions

You are an expert software engineer...`;

export function Editor() {
    const [content, setContent] = useState(DEFAULT_CONTENT);
    const [mode, setMode] = useState<"write" | "preview">("write");
    const [parsed, setParsed] = useState(parseFrontMatter(DEFAULT_CONTENT));

    useEffect(() => {
        setParsed(parseFrontMatter(content));
    }, [content]);

    return (
        <div className="h-full flex flex-col">
            {/* Editor Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <Link to="/" className="text-zinc-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div className="flex flex-col">
                        <input
                            type="text"
                            value={parsed.data.name || "Untitled Prompt"}
                            readOnly
                            className="bg-transparent text-xl font-bold text-white focus:outline-none placeholder:text-zinc-600 cursor-default"
                        />
                        {parsed.data.category && (
                            <div className="flex items-center gap-1 text-xs text-zinc-500 mt-1">
                                <Tag className="w-3 h-3" />
                                <span>{parsed.data.category}</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="bg-zinc-900 rounded-lg p-1 flex border border-border mr-4">
                        <button
                            onClick={() => setMode("write")}
                            className={`p-2 rounded-md text-sm flex items-center gap-2 transition-all ${mode === "write" ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"}`}
                        >
                            <Code className="w-4 h-4" /> Write
                        </button>
                        <button
                            onClick={() => setMode("preview")}
                            className={`p-2 rounded-md text-sm flex items-center gap-2 transition-all ${mode === "preview" ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"}`}
                        >
                            <Eye className="w-4 h-4" /> Preview
                        </button>
                    </div>
                    <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 transition-colors font-medium text-sm">
                        <Save className="w-4 h-4" /> Save
                    </button>
                </div>
            </div>

            {/* Editor Body */}
            <div className="flex-1 border border-border rounded-lg bg-card overflow-hidden flex shadow-sm">
                {mode === "write" ? (
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full h-full bg-zinc-950 p-6 text-zinc-300 font-mono text-sm resize-none focus:outline-none leading-relaxed"
                        spellCheck={false}
                    />
                ) : (
                    <div className="w-full h-full bg-zinc-900/50 p-8 overflow-auto">
                        {/* Metadata Preview Card */}
                        <div className="mb-8 p-4 bg-zinc-800/50 rounded-lg border border-border">
                            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <FileText className="w-3 h-3" /> Metadata
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <span className="text-xs text-zinc-500 block">Name</span>
                                    <span className="text-sm text-white font-medium">{parsed.data.name || "-"}</span>
                                </div>
                                <div>
                                    <span className="text-xs text-zinc-500 block">Category</span>
                                    <span className="text-sm text-white font-medium">{parsed.data.category || "-"}</span>
                                </div>
                            </div>
                        </div>

                        {/* Content Preview */}
                        <div className="prose prose-invert prose-zinc max-w-none">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {parsed.content}
                            </ReactMarkdown>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
