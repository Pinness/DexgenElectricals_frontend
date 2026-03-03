import { useEffect, useState, useCallback, useRef } from "react";
import { supabase } from "../lib/supabaseClient";
import { SiteContent } from "../types/supabase";
import { toast } from "sonner";

export function useAdminContent() {
    const [content, setContent] = useState<SiteContent[]>([]);
    const [loading, setLoading] = useState(true);
    const fetchCount = useRef(0);

    const fetchContent = useCallback(async () => {
        const currentFetchId = ++fetchCount.current;
        const startTime = performance.now();

        console.log(`[CMS] Starting fetch of admin content (ID: ${currentFetchId})...`);

        try {
            setLoading(true);

            // Admin fetches ALL content, including drafts
            const { data, error } = await supabase
                .from("site_content")
                .select("*")
                .order("section_key", { ascending: true })
                .order("sort_order", { ascending: true });

            if (error) throw error;

            // Silently discard if a newer fetch has started
            if (currentFetchId !== fetchCount.current) return;

            const endTime = performance.now();
            console.log(`[CMS] Fetch ${currentFetchId} successful. duration: ${(endTime - startTime).toFixed(2)}ms. Items: ${data?.length || 0}`);

            setContent(data || []);
        } catch (error: any) {
            console.error(`[CMS] Fetch ${currentFetchId} failed:`, error);
            toast.error("Failed to load content: " + (error.message || "Unknown error"));
        } finally {
            if (currentFetchId === fetchCount.current) {
                setLoading(false);
            }
        }
    }, []);

    useEffect(() => {
        // Initial fetch
        fetchContent();

        // Setup real-time subscription for immediate feedback across tabs/editors
        const channel = supabase
            .channel('admin_content_changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'site_content' }, () => {
                console.log("[CMS] Real-time update detected, refetching...");
                fetchContent();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [fetchContent]);

    const updateContent = async (id: string, updates: Partial<SiteContent>) => {
        const startTime = performance.now();
        console.log(`[CMS] Updating item ${id}...`);

        try {
            const { error } = await supabase
                .from("site_content")
                .update(updates)
                .eq("id", id);

            if (error) throw error;

            const duration = performance.now() - startTime;
            console.log(`[CMS] Update successful. duration: ${duration.toFixed(2)}ms`);

            toast.success("Content saved.");

            // Update local state for immediate UI response
            setContent((prev) =>
                prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
            );

            return true;
        } catch (error: any) {
            console.error("[CMS] Update error:", error);
            toast.error("Failed to update: " + error.message);
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
