import { ContentTable } from "../ContentTable";

export default function ContentManagement() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Content Management</h1>
                    <p className="text-muted-foreground mt-1">Manage sections, projects, and services across your website.</p>
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-soft border border-gray-100/50 p-2 md:p-6">
                <ContentTable />
            </div>
        </div>
    );
}
