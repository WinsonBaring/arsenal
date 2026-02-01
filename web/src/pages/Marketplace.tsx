import { Search, Download, Star, Filter, TrendingUp } from "lucide-react";
import { usePrompts } from "@/lib/storage";

export function Marketplace() {
    const { reinstallPrompt } = usePrompts();
    const COMMUNITY_PROMPTS = [
        {
            id: "p-1",
            name: "Golang Cobra CLI Expert",
            author: "spf13_fan",
            downloads: "1.2k",
            description: "Writes idiomatic Go code for CLI tools using Cobra and Viper best practices. Includes middleware patterns.",
            tags: ["Go", "CLI", "Backend"],
            rating: 4.9
        },
        {
            id: "p-2",
            name: "Tailwind v4 Migrator",
            author: "css_wizard",
            downloads: "850",
            description: "Helps migrate Tailwind v3 configs to the new v4 CSS-variable based architecture.",
            tags: ["CSS", "Frontend"],
            rating: 4.7
        },
        {
            id: "p-3",
            name: "GitHub Actions CI/CD",
            author: "devops_guy",
            downloads: "3.4k",
            description: "Generates robust workflow yamls for Go, Node, and Rust projects. Includes security scanning.",
            tags: ["DevOps", "CI/CD"],
            rating: 4.8
        },
        {
            id: "p-4",
            name: "Supabase RLS Policy Generator",
            author: "db_admin",
            downloads: "2.1k",
            description: "Secure Row Level Security policies for your Postgres database. prevent unauthorized access.",
            tags: ["Database", "Security"],
            rating: 5.0
        }
    ];

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                <div>
                    <h2 className="text-4xl font-bold tracking-tight text-white mb-2">Marketplace</h2>
                    <p className="text-zinc-400 text-lg">Discover high-quality prompts from the community.</p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative w-full md:w-80 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-purple-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search prompts..."
                            className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all placeholder:text-zinc-600"
                        />
                    </div>
                    <button className="p-2.5 rounded-xl border border-white/10 bg-black/40 text-zinc-400 hover:text-white hover:bg-white/5 transition-colors">
                        <Filter className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {COMMUNITY_PROMPTS.map((p) => (
                    <div key={p.id} className="group relative p-6 rounded-2xl border border-white/5 bg-black/40 backdrop-blur-sm hover:bg-white/5 transition-all duration-300 flex flex-col md:flex-row items-start md:items-center gap-6 hover:shadow-2xl hover:shadow-purple-900/10 hover:border-purple-500/20">
                        {/* Rank/Icon */}
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center shrink-0 border border-white/5 group-hover:scale-105 transition-transform shadow-inner">
                            <Star className="w-6 h-6 text-yellow-500 fill-yellow-500/20" />
                        </div>

                        <div className="flex-1 min-w-0 z-10">
                            <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors truncate">{p.name}</h3>
                                <span className="text-xs text-zinc-500 px-2 py-0.5 rounded-md bg-white/5 border border-white/5 font-mono">@{p.author}</span>
                            </div>
                            <p className="text-zinc-400 mb-3 leading-relaxed">{p.description}</p>
                            <div className="flex gap-2">
                                {p.tags.map(tag => (
                                    <span key={tag} className="text-xs text-indigo-300/80 bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20 font-medium">#{tag}</span>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-1 shrink-0 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-white/5 pt-4 md:pt-0 mt-2 md:mt-0">
                            <div className="flex items-center gap-4 md:flex-col md:items-end md:gap-0">
                                <div className="flex items-center gap-1.5 text-zinc-300">
                                    <Download className="w-3.5 h-3.5" />
                                    <span className="font-bold">{p.downloads}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-yellow-500/80 md:mt-1">
                                    <TrendingUp className="w-3.5 h-3.5" />
                                    <span className="font-bold text-sm">{p.rating}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    reinstallPrompt(p);
                                    alert(`Installed ${p.name}!`);
                                }}
                                className="mt-0 md:mt-3 flex items-center gap-2 bg-white text-black px-5 py-2 rounded-lg hover:bg-zinc-200 hover:scale-105 transition-all font-semibold text-sm shadow-lg shadow-white/5"
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
