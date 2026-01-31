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
        <div className={cn("w-64 h-screen border-r border-border bg-card flex flex-col", className)}>
            <div className="h-14 flex items-center px-6 border-b border-border">
                <Box className="w-6 h-6 text-purple-500 mr-2" />
                <span className="font-bold text-lg tracking-tight">Arsenal</span>
            </div>

            <div className="flex-1 py-6 px-3">
                <div className="space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            to={item.path}
                            className={cn(
                                "w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                location.pathname === item.path
                                    ? "bg-secondary text-white"
                                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                            )}
                        >
                            <item.icon className="w-4 h-4 mr-3" />
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>

            <div className="p-4 border-t border-border">
                <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500" />
                    <div className="ml-3">
                        <p className="text-sm font-medium text-white">Winson Baring</p>
                        <p className="text-xs text-zinc-500">Pro Plan</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
