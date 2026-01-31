import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
    const navigate = useNavigate();

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white">My Library</h2>
                    <p className="text-zinc-400 mt-1">Manage your prompt engineered rules.</p>
                </div>
                <button
                    onClick={() => navigate("/editor")}
                    className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md hover:bg-zinc-200 transition-colors font-medium text-sm"
                >
                    <Plus className="w-4 h-4" /> New Prompt
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Mock Content */}
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="p-6 rounded-lg border border-border bg-card hover:border-zinc-700 transition-all cursor-pointer group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 rounded bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:bg-purple-500/10 group-hover:text-purple-400 transition-colors">
                                #
                            </div>
                            <span className="text-xs text-zinc-500 font-mono">v1.0.{i}</span>
                        </div>
                        <h3 className="font-semibold text-white mb-2">React Expert Guidelines</h3>
                        <p className="text-sm text-zinc-400 line-clamp-2">A set of strict rules for writing performant React code, including useEffect cleanup.</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
