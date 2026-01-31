import { Search, Download, Star } from "lucide-react";
import { usePrompts } from "@/lib/storage";

export function Marketplace() {
    const { reinstallPrompt } = usePrompts();
    const COMMUNITY_PROMPTS = [
        {
            id: "p-1",
            name: "Golang Cobra CLI Expert",
            author: "spf13_fan",
            downloads: "1.2k",
            description: "Writes idiomatic Go code for CLI tools using Cobra and Viper best practices.",
            tags: ["Go", "CLI", "Backend"]
        },
        {
            id: "p-2",
            name: "Tailwind v4 Migrator",
            author: "css_wizard",
            downloads: "850",
            description: "Helps migrate Tailwind v3 configs to the new v4 CSS-variable based architecture.",
            tags: ["CSS", "Frontend"]
        },
        {
            id: "p-3",
            name: "GitHub Actions CI/CD",
            author: "devops_guy",
            downloads: "3.4k",
            description: "Generates robust workflow yamls for Go, Node, and Rust projects.",
            tags: ["DevOps", "CI/CD"]
        },
        {
            id: "p-4",
            name: "Supabase RLS Policy Generator",
            author: "db_admin",
            downloads: "2.1k",
            description: "Secure Row Level Security policies for your Postgres database.",
            tags: ["Database", "Security"]
        }
    ];

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white">Marketplace</h2>
                    <p className="text-zinc-400 mt-1">Discover prompts from the community.</p>
                </div>

                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Search prompts..."
                        className="w-full bg-zinc-900 border border-border rounded-md pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {COMMUNITY_PROMPTS.map((p) => (
                    <div key={p.id} className="p-4 rounded-lg border border-border bg-card flex flex-col md:flex-row items-start md:items-center gap-4 hover:border-zinc-700 transition-colors">
                        <div className="w-12 h-12 rounded bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center shrink-0">
                            <Star className="w-5 h-5 text-yellow-500" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-white truncate">{p.name}</h3>
                                <span className="text-xs text-zinc-500 px-2 py-0.5 rounded-full bg-zinc-800 border border-zinc-700">by @{p.author}</span>
                            </div>
                            <p className="text-sm text-zinc-400 mb-2">{p.description}</p>
                            <div className="flex gap-2">
                                {p.tags.map(tag => (
                                    <span key={tag} className="text-xs text-indigo-400/80 font-medium">#{tag}</span>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-6 shrink-0 mt-2 md:mt-0 w-full md:w-auto justify-between md:justify-end">
                            <div className="text-right hidden md:block">
                                <span className="block text-sm font-bold text-white">{p.downloads}</span>
                                <span className="text-xs text-zinc-500">installs</span>
                            </div>
                            <button
                                onClick={() => {
                                    reinstallPrompt(p);
                                    alert(`Installed ${p.name}!`);
                                }}
                                className="flex items-center gap-2 bg-zinc-100 text-zinc-900 px-4 py-2 rounded-md hover:bg-white transition-colors font-medium text-sm"
                            >
                                <Download className="w-4 h-4" /> Install
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
