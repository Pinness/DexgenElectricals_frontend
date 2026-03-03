export interface SiteContentMetadata {
    // Shared
    icon?: string;

    // Service Categories & Projects
    features?: string[];
    highlights?: string[];

    // About Stats
    label?: string;
    value?: string;
}

export interface SiteContent {
    id: string;
    section_key: string;
    title: string | null;
    description: string | null;
    image_url: string | null;
    category: string | null;
    metadata: SiteContentMetadata | null;
    sort_order: number;
    is_published: boolean;
    created_at?: string;
    updated_at?: string;
}

export type SectionGroup = 'project' | 'service' | 'about' | 'hero' | 'other';
