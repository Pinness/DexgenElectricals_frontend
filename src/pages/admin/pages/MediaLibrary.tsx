import React, { useEffect, useState } from "react";
import { mediaService } from "@/services/mediaService";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Trash2,
    Copy,
    ExternalLink,
    Upload,
    Loader2,
    CheckCircle2,
    Info
} from "lucide-react";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger
} from "@/components/ui/dialog";

interface MediaFile {
    name: string;
    url: string;
    id: string;
    metadata?: any;
    created_at?: string;
}

export default function MediaLibrary() {
    const [media, setMedia] = useState<MediaFile[]>([]);
    const [loading, setLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const fetchMedia = async () => {
        setLoading(true);
        try {
            const files = await mediaService.listMedia();
            setMedia(files as any);
        } catch (e) {
            toast.error("Failed to load media library.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMedia();
    }, []);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            toast.error("Only image files are allowed.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error("File size must be under 5MB.");
            return;
        }

        setIsUploading(true);
        try {
            const url = await mediaService.uploadImage(file);
            if (url) {
                toast.success("Image uploaded successfully.");
                fetchMedia();
            } else {
                toast.error("Upload failed.");
            }
        } catch (e) {
            toast.error("Upload error.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = async (url: string) => {
        setDeletingId(url);
        try {
            const success = await mediaService.deleteImage(url);
            if (success) {
                toast.success("Media deleted from storage.");
                fetchMedia();
            } else {
                toast.error("Delete failed.");
            }
        } catch (e) {
            toast.error("Deletion error.");
        } finally {
            setDeletingId(null);
        }
    };

    const copyToClipboard = (url: string) => {
        navigator.clipboard.writeText(url);
        toast.info("Public URL copied to clipboard!", {
            icon: <CheckCircle2 className="h-4 w-4 text-green-500" />
        });
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-500">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black tracking-tight text-foreground">Media Assets</h1>
                    <p className="text-muted-foreground font-medium flex items-center gap-2">
                        <Info className="h-4 w-4 text-primary" />
                        Manage your website's images and public assets efficiently.
                    </p>
                </div>

                <div className="relative group">
                    <input
                        type="file"
                        id="media-upload"
                        className="hidden"
                        onChange={handleFileUpload}
                        disabled={isUploading}
                        accept="image/*"
                    />
                    <label
                        htmlFor="media-upload"
                        className={`inline-flex items-center gap-3 px-8 py-3.5 rounded-2xl font-bold bg-primary text-white shadow-soft hover:shadow-strong active:scale-95 transition-all text-sm cursor-pointer ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                        {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                        {isUploading ? "Uploading..." : "Import New Asset"}
                    </label>
                </div>
            </div>

            {/* Media Grid */}
            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                        <div key={n} className="aspect-square rounded-3xl bg-gray-100 animate-pulse border border-gray-100/50" />
                    ))}
                </div>
            ) : media.length === 0 ? (
                <div className="h-[400px] flex flex-col items-center justify-center bg-white rounded-[3rem] shadow-soft border-2 border-dashed border-gray-100">
                    <div className="p-6 rounded-full bg-gray-50 mb-6 shadow-inner">
                        <span className="text-5xl">🏜️</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground">Your library is empty</h3>
                    <p className="text-muted-foreground text-sm max-w-xs text-center mt-3 font-medium">
                        Start by uploading images to use them in your content sections.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {media.map((file) => (
                        <Card key={file.name} className="group relative border-none shadow-soft rounded-[2rem] overflow-hidden hover:shadow-medium hover:scale-[1.02] transition-all duration-300">
                            <CardContent className="p-0 aspect-square relative">
                                <img
                                    src={file.url}
                                    alt={file.name}
                                    className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500"
                                />

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 gap-2 backdrop-blur-[2px]">
                                    <div className="flex items-center gap-1.5 mb-auto">
                                        <button
                                            onClick={() => copyToClipboard(file.url)}
                                            className="h-8 w-8 rounded-xl bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-md transition-colors border border-white/20"
                                            title="Copy URL"
                                        >
                                            <Copy className="h-3.5 w-3.5" />
                                        </button>
                                        <a
                                            href={file.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="h-8 w-8 rounded-xl bg-white/20 hover:bg-primary text-white flex items-center justify-center backdrop-blur-md transition-colors border border-white/20"
                                            title="View Original"
                                        >
                                            <ExternalLink className="h-3.5 w-3.5" />
                                        </a>
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-[10px] font-mono text-white/70 truncate uppercase tracking-widest leading-none mb-1">{file.name}</p>

                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    className="w-full h-10 rounded-xl bg-red-500/80 hover:bg-red-600 text-white border-none font-bold text-[10px] uppercase tracking-widest shadow-lg"
                                                    disabled={deletingId === file.url}
                                                >
                                                    {deletingId === file.url ? <Loader2 className="h-3 w-3 animate-spin" /> : <Trash2 className="h-3.5 w-3.5 mr-2" />}
                                                    Delete Asset
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="rounded-[2rem] p-8 border-none shadow-medium animate-in zoom-in-95 backdrop-blur-xl bg-white/90">
                                                <DialogHeader className="space-y-3">
                                                    <DialogTitle className="text-2xl font-black tracking-tight text-foreground">Permantently Delete Asset?</DialogTitle>
                                                    <p className="text-muted-foreground font-medium text-sm leading-relaxed">
                                                        This action cannot be undone. Any content section using this image will show a <span className="text-red-500 font-bold">broken link</span>.
                                                    </p>
                                                </DialogHeader>
                                                <div className="py-6 flex justify-center">
                                                    <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-white shadow-soft rotate-3 group-hover:rotate-0 transition-transform">
                                                        <img src={file.url} className="w-full h-full object-cover" />
                                                    </div>
                                                </div>
                                                <DialogFooter className="gap-4 sm:flex-row">
                                                    <Button variant="outline" className="flex-1 h-12 rounded-2xl font-bold border-gray-100 hover:bg-gray-50">Cancel</Button>
                                                    <Button
                                                        className="flex-1 h-12 rounded-2xl bg-red-500 hover:bg-red-600 font-black tracking-widest text-white shadow-soft"
                                                        onClick={() => handleDelete(file.url)}
                                                    >
                                                        Confirm Delete
                                                    </Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
