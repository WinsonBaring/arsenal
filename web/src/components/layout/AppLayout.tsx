import { useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Toaster } from "sonner";

export function AppLayout({ children }: { children: React.ReactNode }) {
    const location = useLocation();

    // Derived title based on route
    const getPageTitle = () => {
        if (location.pathname === '/') return 'Library';
        if (location.pathname === '/marketplace') return 'Marketplace';
        if (location.pathname.startsWith('/editor')) return 'Editor';
        return 'Dashboard';
    };

    return (
        <div className="flex h-screen bg-black text-white font-sans overflow-hidden relative selection:bg-purple-500/30">
            {/* Global Toaster */}
            <Toaster position="bottom-right" theme="dark" closeButton richColors />

            {/* Ambient Animated Background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[128px] animate-pulse-slow" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[100px]" />
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px]" />
            </div>

            <Sidebar />

            <main className="flex-1 flex flex-col min-w-0 relative z-10">
                {/* Glass Header */}
                <header className="h-16 border-b border-white/5 bg-black/40 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-50">
                    <div className="flex items-center gap-2 text-sm text-zinc-500">
                        <span>Arsenal</span>
                        <span>/</span>
                        <span className="text-zinc-200 font-medium">{getPageTitle()}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="h-8 w-8 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-xs font-mono text-zinc-400">
                            v0.1
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-auto p-8 animate-in fade-in duration-500">
                    <div className="max-w-7xl mx-auto w-full">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
