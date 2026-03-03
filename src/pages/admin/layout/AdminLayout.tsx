import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/admin/Sidebar";

export default function AdminLayout() {
    return (
        <div className="min-h-screen bg-gray-50/50 flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <main className="flex-1 lg:ml-64 min-h-screen transition-all duration-300">
                <div className="max-w-[1400px] mx-auto p-4 md:p-8 lg:p-10">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
