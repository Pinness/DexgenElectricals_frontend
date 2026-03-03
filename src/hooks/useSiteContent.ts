import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

import { SiteContent } from "../types/supabase";

export function useSiteContentList(keyPrefix: string) {
    const [content, setContent] = useState<SiteContent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchList() {
            try {
                setLoading(true);
                const { data, error: err } = await supabase
                    .from("site_content")
                    .select("*")
                    .like("section_key", `${keyPrefix}%`)
                    .eq("is_published", true)
                    .order("sort_order", { ascending: true });

                if (err) throw err;

                setContent(data || []);
            } catch (e: any) {
                console.error("Error fetching content:", e.message);
                setError(e.message);
            } finally {
                setLoading(false);
            }
        }

        if (keyPrefix) fetchList();
    }, [keyPrefix]);

    return { content, loading, error };
}
