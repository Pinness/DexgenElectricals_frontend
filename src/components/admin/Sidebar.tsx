import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import {
    LayoutDashboard,
    FileText,
    Image as ImageIcon,
    Settings,
    LogOut,
    Menu,
    X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
    { name: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Content", href: "/admin/content", icon: FileText },
    { name: "Media Library", href: "/admin/media", icon: ImageIcon },
    { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function Sidebar() {
    const location = useLocation();
    const { signOut, user } = useAuth();
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <>
            {/* Mobile Mobile Toggle */}
            <Button
                variant="ghost"
                size="icon"
                className="lg:hidden fixed top-4 left-4 z-50 bg-white shadow-md border"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside className={cn(
                "fixed left-0 top-0 h-full w-64 bg-white border-r z-40 transition-transform duration-300 lg:translate-x-0 flex flex-col shadow-soft",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                {/* Logo Area */}
                <div className="h-20 flex items-center px-8 border-b">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shadow-soft">
                            <span className="text-white font-bold text-xl">D</span>
                        </div>
                        <span className="font-bold text-xl tracking-tight text-foreground">Dexgen <span className="text-primary">CMS</span></span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-8 space-y-2">
                    {navigation.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-sm font-medium",
                                    isActive
                                        ? "bg-primary/5 text-primary shadow-[inset_0_0_0_1px_rgba(var(--primary),0.1)]"
                                        : "text-muted-foreground hover:bg-gray-50 hover:text-foreground"
                                )}
                            >
                                <item.icon className={cn(
                                    "h-5 w-5 transition-transform duration-200 group-hover:scale-110",
                                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                                )} />
                                {item.name}
                                {isActive && (
                                    <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer / User Profile */}
                <div className="p-4 border-t bg-gray-50/50">
                    <div className="px-4 py-3 mb-4 rounded-xl bg-white border shadow-soft flex items-center gap-3 overflow-hidden">
                        <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                            <span className="text-xs font-bold text-accent">AD</span>
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs font-semibold truncate text-foreground">Admin User</p>
                            <p className="text-[10px] text-muted-foreground truncate">{user?.email}</p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 px-4 py-3 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                        onClick={signOut}
                    >
                        <LogOut className="h-5 w-5" />
                        <span className="text-sm font-medium">Log Out</span>
                    </Button>
                </div>
            </aside>
        </>
    );
}
