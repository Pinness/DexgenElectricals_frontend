import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { SiteContent } from "../types/supabase";
import { toast } from "sonner";

export function useAdminContent() {
    const [content, setContent] = useState<SiteContent[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchContent = async () => {
        try {
            setLoading(true);
            // Admin fetches ALL content, including drafts (is_published = false)
            const { data, error } = await supabase
                .from("site_content")
                .select("*")
                .order("section_key", { ascending: true })
                .order("sort_order", { ascending: true });

            if (error) throw error;
            setContent(data || []);
        } catch (error: any) {
            console.error("Error fetching admin content:", error);
            toast.error("Failed to load content: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContent();
    }, []);

    const updateContent = async (id: string, updates: Partial<SiteContent>) => {
        try {
            const { error } = await supabase
                .from("site_content")
                .update(updates)
                .eq("id", id);

            if (error) throw error;

            toast.success("Content updated successfully");

            // Update local state to avoid refetching everything immediately
            setContent((prev) =>
                prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
            );

            return true;
        } catch (error: any) {
            console.error("Error updating content:", error);
            toast.error("Failed to update content: " + error.message);
            return false;
        }
    };

    const togglePublishStatus = async (id: string, currentStatus: boolean) => {
        return updateContent(id, { is_published: !currentStatus });
    };

    return {
        content,
        loading,
        refetch: fetchContent,
        updateContent,
        togglePublishStatus
    };
}
