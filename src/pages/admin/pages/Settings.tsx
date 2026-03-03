export default function Settings() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
                <p className="text-muted-foreground mt-1">Configure your CMS and account preferences.</p>
            </div>

            <div className="h-[400px] flex flex-col items-center justify-center bg-white rounded-3xl shadow-soft border-2 border-dashed border-gray-100">
                <div className="p-4 rounded-full bg-gray-50 mb-4">
                    <span className="text-4xl">⚙️</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">CMS Settings are coming soon</h3>
                <p className="text-muted-foreground text-sm max-w-xs text-center mt-2">
                    Configuration options for roles, environment variables, and more will be available here.
                </p>
            </div>
        </div>
    );
}
