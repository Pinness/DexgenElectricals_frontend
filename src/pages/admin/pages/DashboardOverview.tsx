import { useAuth } from "@/components/AuthProvider";
import {
    FileText,
    Image as ImageIcon,
    Settings as SettingsIcon,
    Users
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardOverview() {
    const { user } = useAuth();

    const stats = [
        { name: "Total Content Items", value: "24", icon: FileText, color: "text-blue-500", bg: "bg-blue-50" },
        { name: "Media Assets", value: "12", icon: ImageIcon, color: "text-purple-500", bg: "bg-purple-50" },
        { name: "Site Visibility", value: "Public", icon: Users, color: "text-green-500", bg: "bg-green-50" },
        { name: "Last Sync", value: "2 mins ago", icon: SettingsIcon, color: "text-orange-500", bg: "bg-orange-50" },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome back</h1>
                <p className="text-muted-foreground mt-1">Heres whats happening with Dexgen CMS today.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.name} className="border-none shadow-soft overflow-hidden group hover:shadow-medium transition-all">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{stat.name}</CardTitle>
                            <div className={`p-2 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                                <stat.icon className="h-4 w-4" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-none shadow-soft p-6">
                    <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="p-4 rounded-2xl bg-primary/5 hover:bg-primary/10 text-primary text-sm font-semibold transition-colors text-left border border-primary/10">
                            Edit Homepage
                        </button>
                        <button className="p-4 rounded-2xl bg-accent/5 hover:bg-accent/10 text-accent-foreground text-sm font-semibold transition-colors text-left border border-accent/10">
                            Upload Media
                        </button>
                    </div>
                </Card>

                <Card className="border-none shadow-soft p-6">
                    <h3 className="text-lg font-bold mb-4">Session Info</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Logged in as:</span>
                            <span className="font-mono text-xs">{user?.email}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Role:</span>
                            <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wider">Administrator</span>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
