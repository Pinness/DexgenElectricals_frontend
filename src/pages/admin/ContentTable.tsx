import { useState } from "react";
import { ImageUpload } from "../../components/ImageUpload";
import { useAdminContent } from "../../hooks/useAdminContent";
import { SiteContent, SectionGroup } from "../../types/supabase";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { Switch } from "../../components/ui/switch";
import { toast } from "sonner";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "../../components/ui/dialog";
import { MetadataForm } from "./components/MetadataForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";

export function ContentTable() {
    const { content, loading, updateContent, togglePublishStatus } = useAdminContent();
    const [editingItem, setEditingItem] = useState<SiteContent | null>(null);
    const [originalItem, setOriginalItem] = useState<SiteContent | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    // Group content by section category for easier viewing
    const groupedContent = content.reduce((acc, item) => {
        const groupPrefix = item.section_key.split('_')[0] as SectionGroup;
        if (!acc[groupPrefix]) acc[groupPrefix] = [];
        acc[groupPrefix].push(item);
        return acc;
    }, {} as Record<SectionGroup, SiteContent[]>);

    const handleEditItem = (item: SiteContent) => {
        // Create deep copies to track changes
        const itemCopy = JSON.parse(JSON.stringify(item));
        setEditingItem(itemCopy);
        setOriginalItem(JSON.parse(JSON.stringify(item)));
    };

    const handleCloseDialog = (force = false) => {
        if (!editingItem || !originalItem) {
            setEditingItem(null);
            setOriginalItem(null);
            return;
        }

        const hasChanged = JSON.stringify(editingItem) !== JSON.stringify(originalItem);

        if (!force && hasChanged && !isSaving) {
            const confirmDiscard = window.confirm("You have unsaved changes. Are you sure you want to discard them?");
            if (!confirmDiscard) return;
        }

        setEditingItem(null);
        setOriginalItem(null);
    };

    const handleSave = async () => {
        if (!editingItem) return;
        setIsSaving(true);

        try {
            const { id, created_at, updated_at, ...updates } = editingItem;

            const success = await updateContent(id, updates);
            if (success) {
                toast.success("Content published successfully!");
                setEditingItem(null);
                setOriginalItem(null);
            }
        } catch (e: any) {
            toast.error("Error saving changes: " + e.message);
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-20 space-y-4">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">Synchronizing CMS Data...</p>
            </div>
        );
    }

    return (
        <div className="space-y-12">
            {Object.entries(groupedContent).map(([groupPrefix, items]) => (
                <div key={groupPrefix} className="bg-white rounded-[2.5rem] shadow-soft border border-gray-100 overflow-hidden mb-10 transition-all hover:shadow-medium">
                    <div className="bg-gray-50/50 px-10 py-6 border-b flex items-center justify-between">
                        <div className="space-y-1">
                            <h2 className="text-xl font-black capitalize text-foreground tracking-tight">{groupPrefix} Section</h2>
                            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Global Website Content</p>
                        </div>
                        <span className="px-4 py-1.5 rounded-2xl bg-white border shadow-sm text-[10px] font-black text-primary uppercase tracking-[0.15em] leading-none">
                            {items.length} Entries
                        </span>
                    </div>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent border-gray-100/30">
                                    <TableHead className="w-[220px] pl-10 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">Internal Key</TableHead>
                                    <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">Display Title</TableHead>
                                    <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">Status</TableHead>
                                    <TableHead className="text-right pr-10 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {items.map((item) => (
                                    <TableRow key={item.id} className="hover:bg-gray-50/20 border-gray-100/30 transition-colors group">
                                        <TableCell className="font-mono text-[10px] text-muted-foreground/70 pl-10 uppercase tracking-widest">{item.section_key}</TableCell>
                                        <TableCell className="font-bold text-foreground truncate max-w-[240px]">
                                            {item.title || <span className="text-muted-foreground font-light italic opacity-30">Untitled Asset</span>}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center space-x-3">
                                                <Switch
                                                    checked={item.is_published}
                                                    onCheckedChange={() => togglePublishStatus(item.id, item.is_published)}
                                                    className="scale-90 data-[state=checked]:bg-primary shadow-sm"
                                                />
                                                <span className={`text-[10px] font-black uppercase tracking-[0.15em] ${item.is_published ? "text-green-500" : "text-amber-500"}`}>
                                                    {item.is_published ? "Live" : "Draft"}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right pr-10">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="rounded-2xl h-10 px-6 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all duration-500 shadow-none hover:shadow-strong"
                                                onClick={() => handleEditItem(item)}
                                            >
                                                Edit
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            ))}

            {/* Edit Dialog */}
            <Dialog open={!!editingItem} onOpenChange={(open) => !open && handleCloseDialog()}>
                <DialogContent className="max-w-2xl h-[90vh] flex flex-col rounded-[3rem] p-0 overflow-hidden border-none shadow-strong animate-in zoom-in-95 duration-500 ease-out">
                    <DialogHeader className="p-12 border-b bg-gray-50/50 shrink-0">
                        <div className="space-y-2">
                            <DialogTitle className="text-3xl font-black tracking-tighter text-foreground">Edit Component</DialogTitle>
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded-lg bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">{editingItem?.section_key.split('_')[0]}</span>
                                <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest opacity-50 italic">{editingItem?.section_key}</span>
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
                        {editingItem && (
                            <Tabs defaultValue="basic" className="w-full">
                                <TabsList className="grid w-full grid-cols-2 rounded-[1.5rem] p-1.5 bg-gray-100/50 mb-12 border border-gray-100 shadow-inner">
                                    <TabsTrigger value="basic" className="rounded-[1.1rem] py-3 text-[10px] font-black uppercase tracking-[0.2em] data-[state=active]:bg-white data-[state=active]:shadow-soft transition-all duration-300">Basic Configuration</TabsTrigger>
                                    <TabsTrigger value="content" className="rounded-[1.1rem] py-3 text-[10px] font-black uppercase tracking-[0.2em] data-[state=active]:bg-white data-[state=active]:shadow-soft transition-all duration-300">Detailed Content</TabsTrigger>
                                </TabsList>

                                <TabsContent value="basic" className="space-y-10 animate-in fade-in slide-in-from-top-4 duration-500">
                                    <div className="grid gap-4">
                                        <Label htmlFor="title" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-2">Primary Heading</Label>
                                        <Input
                                            id="title"
                                            className="h-14 rounded-[1.25rem] shadow-soft border-gray-100 focus:ring-primary/10 transition-all font-bold text-lg"
                                            value={editingItem.title || ""}
                                            onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                                        />
                                    </div>

                                    <div className="grid gap-4">
                                        <Label htmlFor="description" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-2">Supporting Description</Label>
                                        <Textarea
                                            id="description"
                                            rows={6}
                                            className="rounded-[1.25rem] shadow-soft border-gray-100 focus:ring-primary/10 transition-all font-medium resize-none p-6 text-base leading-relaxed"
                                            value={editingItem.description || ""}
                                            onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                                        />
                                    </div>

                                    <div className="grid gap-4">
                                        <Label htmlFor="category" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-2">Categorization / Group</Label>
                                        <Input
                                            id="category"
                                            className="h-14 rounded-[1.25rem] shadow-soft border-gray-100 focus:ring-primary/10 transition-all font-bold"
                                            value={editingItem.category || ""}
                                            onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                                        />
                                    </div>
                                </TabsContent>

                                <TabsContent value="content" className="space-y-10 animate-in fade-in slide-in-from-top-4 duration-500">
                                    <div className="grid gap-6 p-10 border rounded-[2.5rem] bg-gray-50/30 border-gray-100 shadow-inner">
                                        <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Component Visual Asset</Label>
                                        <ImageUpload
                                            currentImageUrl={editingItem.image_url || undefined}
                                            onUploadComplete={(url) => setEditingItem({ ...editingItem, image_url: url })}
                                        />
                                    </div>

                                    <div className="space-y-6">
                                        <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-2">Advanced Structural Data</Label>
                                        <MetadataForm
                                            metadata={editingItem.metadata || {}}
                                            sectionKey={editingItem.section_key}
                                            onChange={(metadata) => setEditingItem({ ...editingItem, metadata })}
                                        />
                                    </div>
                                </TabsContent>
                            </Tabs>
                        )}
                    </div>

                    <DialogFooter className="p-10 border-t bg-gray-50/50 gap-6 shrink-0 relative z-10">
                        <Button variant="ghost" className="rounded-2xl h-14 px-12 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-gray-100 transition-all" onClick={() => handleCloseDialog()}>Cancel Changes</Button>
                        <Button disabled={isSaving} className="rounded-2xl h-14 px-12 font-black text-[10px] uppercase tracking-[0.2em] shadow-soft hover:shadow-strong transition-all flex-1 bg-primary text-white" onClick={handleSave}>
                            {isSaving ? "Saving..." : "Save Changes"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
