import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { Loader2, Upload, X, ImageIcon } from "lucide-react";
import { mediaService } from "@/services/mediaService";

interface ImageUploadProps {
    onUploadComplete: (url: string) => void;
    currentImageUrl?: string;
    bucketName?: string;
}

export function ImageUpload({
    onUploadComplete,
    currentImageUrl,
}: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState<string | null>(currentImageUrl || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Basic validation
        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            toast.error("File size must be less than 5MB.");
            return;
        }

        try {
            setUploading(true);

            // Use the centralized media service to replace or upload
            const publicUrl = await mediaService.replaceImage(currentImageUrl || null, file);

            if (!publicUrl) {
                throw new Error("Failed to upload image.");
            }

            setPreview(publicUrl);
            onUploadComplete(publicUrl);
            toast.success(currentImageUrl ? "Image replaced (old file deleted)" : "Image uploaded successfully!");
        } catch (error: any) {
            console.error("Error uploading image:", error);
            toast.error("Failed to upload image: " + error.message);
        } finally {
            setUploading(false);
        }
    };

    const clearImage = async () => {
        // If there was a preview (from this session or passed in), 
        // we might want to delete it from storage, but we should be careful
        // not to delete images still in use.
        // For now, we just clear the reference in the form.
        setPreview(null);
        onUploadComplete("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-3xl bg-white border border-gray-100 shadow-inner">
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center group border border-gray-100 shadow-soft">
                    {preview ? (
                        <>
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                            />
                            <button
                                onClick={clearImage}
                                className="absolute inset-0 bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]"
                                type="button"
                                title="Remove Image"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </>
                    ) : (
                        <ImageIcon className="w-8 h-8 text-muted-foreground opacity-30" />
                    )}
                </div>

                <div className="flex-1 space-y-3 w-full sm:w-auto">
                    <div className="flex flex-col gap-2">
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            disabled={uploading}
                            className="hidden"
                            id="image-upload-input"
                            ref={fileInputRef}
                        />
                        <Button
                            type="button"
                            variant="outline"
                            disabled={uploading}
                            className={`h-10 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${preview ? 'border-primary text-primary hover:bg-primary/5' : 'bg-gray-50 border-gray-100 hover:bg-gray-100'}`}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {uploading ? (
                                <>
                                    <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <Upload className="mr-2 h-3.5 w-3.5" />
                                    {preview ? "Replace Image" : "Choose File"}
                                </>
                            )}
                        </Button>
                        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider text-center sm:text-left">
                            PNG, JPG or WEBP (Max 5MB)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
