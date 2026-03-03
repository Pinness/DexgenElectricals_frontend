import { supabase } from "../lib/supabaseClient";

/**
 * Service to handle media operations with storage cleanup
 */
export const mediaService = {
    /**
     * Upload an image to the public-assets bucket
     */
    async uploadImage(file: File): Promise<string | null> {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `uploads/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('public-assets')
            .upload(filePath, file);

        if (uploadError) {
            console.error('Upload error:', uploadError);
            return null;
        }

        const { data } = supabase.storage
            .from('public-assets')
            .getPublicUrl(filePath);

        return data.publicUrl;
    },

    /**
     * Delete an image from storage given its public URL
     */
    async deleteImage(url: string | null): Promise<boolean> {
        if (!url) return true;

        try {
            // Extract path from URL
            // Example: https://.../storage/v1/object/public/public-assets/uploads/filename.jpg
            const urlParts = url.split('public-assets/');
            if (urlParts.length < 2) return false;

            const filePath = urlParts[1];

            const { error } = await supabase.storage
                .from('public-assets')
                .remove([filePath]);

            if (error) {
                console.error('Delete error:', error);
                return false;
            }

            return true;
        } catch (e) {
            console.error('Error parsing URL for deletion:', e);
            return false;
        }
    },

    /**
     * Replace an old image with a new file
     */
    async replaceImage(oldUrl: string | null, newFile: File): Promise<string | null> {
        // 1. Upload new
        const newUrl = await this.uploadImage(newFile);
        if (!newUrl) return null;

        // 2. Delete old (fire and forget or handle error)
        if (oldUrl) {
            this.deleteImage(oldUrl);
        }

        return newUrl;
    },

    /**
     * List all files in the uploads folder
     */
    async listMedia() {
        const { data, error } = await supabase.storage
            .from('public-assets')
            .list('uploads', {
                limit: 100,
                offset: 0,
                sortBy: { column: 'name', order: 'desc' },
            });

        if (error) {
            console.error('Error listing media:', error);
            return [];
        }

        return data.map(file => ({
            ...file,
            url: supabase.storage.from('public-assets').getPublicUrl(`uploads/${file.name}`).data.publicUrl
        }));
    }
};
