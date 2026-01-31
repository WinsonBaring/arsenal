import { Sidebar } from "./Sidebar";

interface AppLayoutProps {
    children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
            <Sidebar />
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                {/* Glassmorphic Header */}
                <header className="h-14 border-b border-border glass flex items-center justify-between px-6 shrink-0 z-10 sticky top-0">
                    <h1 className="text-sm font-medium text-zinc-400">Dashboard / <span className="text-white">Analysis</span></h1>
                    <div className="flex gap-2">
                        {/* Actions will go here */}
                    </div>
                </header>

                <div className="flex-1 overflow-auto p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
