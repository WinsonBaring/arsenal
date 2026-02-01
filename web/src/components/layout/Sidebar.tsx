import { LayoutDashboard, Library, Settings, Wallet, Box } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SidebarProps {
    className?: string;
}

export function Sidebar({ className }: SidebarProps) {
    const location = useLocation();
    const navItems = [
        { icon: Library, label: "My Library", path: "/", active: true },
        { icon: Wallet, label: "Marketplace", path: "/marketplace", active: false },
        { icon: LayoutDashboard, label: "Collections", path: "/", active: false },
        { icon: Settings, label: "Settings", path: "/", active: false },
    ];

    return (
        <div className={cn("w-72 h-screen border-r border-white/5 bg-black/60 backdrop-blur-xl flex flex-col relative z-20 transition-all duration-300", className)}>
            <div className="h-16 flex items-center px-8 border-b border-white/5">
                <Box className="w-6 h-6 text-purple-500 mr-3 animate-pulse" />
                <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-400">Arsenal</span>
            </div>

            <div className="flex-1 py-8 px-4">
                <div className="space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            to={item.path}
                            className={cn(
                                "w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group relative overflow-hidden",
                                location.pathname === item.path
                                    ? "bg-purple-500/10 text-white shadow-lg shadow-purple-500/5 border border-purple-500/20"
                                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                            )}
                        >
                            {location.pathname === item.path && (
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500 rounded-r-full" />
                            )}
                            <item.icon className={cn("w-4 h-4 mr-3 transition-colors", location.pathname === item.path ? "text-purple-400" : "text-zinc-500 group-hover:text-purple-400")} />
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>

            <div className="p-6 border-t border-white/5 bg-black/20">
                <div className="flex items-center p-3 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/20 transition-colors cursor-pointer group">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 shadow-lg shadow-purple-900/20 flex items-center justify-center text-xs font-bold text-white">WB</div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors">Winson Baring</p>
                        <p className="text-xs text-zinc-500">Pro Plan</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
