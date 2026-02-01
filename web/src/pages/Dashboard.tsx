import { Plus, Terminal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function Dashboard() {
    const navigate = useNavigate();
    const [prompts, setPrompts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/prompts')
            .then(res => res.json())
            .then(data => {
                setPrompts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h2 className="text-4xl font-bold tracking-tight text-white mb-2">My Library</h2>
                    <p className="text-zinc-400 text-lg">Manage your intelligent agent rules.</p>
                </div>
                <button
                    onClick={() => navigate("/editor")}
                    className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full hover:bg-purple-50 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 transition-all font-semibold text-sm group"
                >
                    <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" /> New Prompt
                </button>
            </div>

            {loading ? (
                <div className="text-zinc-500 flex items-center gap-2"><div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div> Loading library...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {prompts.map((p) => (
                        <div key={p.id} onClick={() => navigate(`/editor?id=${p.id}`)} className="glass-card p-6 rounded-2xl cursor-pointer group flex flex-col h-full relative overflow-hidden">
                            {/* Decorative Glow */}
                            <div className="absolute -right-10 -top-10 w-32 h-32 bg-purple-500/10 blur-3xl group-hover:bg-purple-500/20 transition-colors" />

                            <div className="flex justify-between items-start mb-6 z-10">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 group-hover:text-purple-400 group-hover:border-purple-500/30 transition-all shadow-inner">
                                    <Terminal className="w-5 h-5" />
                                </div>
                                <span className="text-xs text-purple-300/80 font-mono bg-purple-500/10 px-2 py-1 rounded-full border border-purple-500/10">v{p.version || "0.0.1"}</span>
                            </div>

                            <div className="flex-1 z-10">
                                <h3 className="font-bold text-xl text-white mb-2 group-hover:text-purple-200 transition-colors">{p.name}</h3>
                                <p className="text-sm text-zinc-400 line-clamp-3 leading-relaxed">{p.description || "No description provided."}</p>
                            </div>

                            <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 z-10">
                                {p.category && (
                                    <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-500 bg-zinc-900/80 px-2 py-1 rounded-md border border-white/5 group-hover:border-purple-500/20 group-hover:text-purple-400 transition-colors">
                                        {p.category}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Empty State / Add New Card */}
                    <div onClick={() => navigate("/editor")} className="border border-dashed border-zinc-800 rounded-2xl p-6 flex flex-col items-center justify-center text-zinc-600 hover:text-zinc-400 hover:border-zinc-700 hover:bg-white/5 transition-all cursor-pointer min-h-[250px] group">
                        <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Plus className="w-6 h-6" />
                        </div>
                        <span className="font-medium">Create New Prompt</span>
                    </div>
                </div>
            )}
        </div>
    );
}
