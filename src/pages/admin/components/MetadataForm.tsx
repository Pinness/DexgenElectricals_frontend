import React from "react";
import { SiteContentMetadata } from "../../../types/supabase";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    X,
    Plus,
    Home,
    Building2,
    AlertCircle,
    Shield,
    Clock,
    Award,
    Users,
    CheckCircle2
} from "lucide-react";

interface MetadataFormProps {
    metadata: SiteContentMetadata;
    onChange: (metadata: SiteContentMetadata) => void;
    sectionKey: string;
}

const ICONS = [
    { name: "Home", icon: Home },
    { name: "Building2", icon: Building2 },
    { name: "AlertCircle", icon: AlertCircle },
    { name: "Shield", icon: Shield },
    { name: "Clock", icon: Clock },
    { name: "Award", icon: Award },
    { name: "Users", icon: Users },
    { name: "CheckCircle2", icon: CheckCircle2 },
];

export function MetadataForm({ metadata, onChange, sectionKey }: MetadataFormProps) {
    const handleAddFeature = (key: 'features' | 'highlights') => {
        const current = metadata[key] || [];
        onChange({ ...metadata, [key]: [...current, ""] });
    };

    const handleFeatureChange = (key: 'features' | 'highlights', index: number, value: string) => {
        const current = [...(metadata[key] || [])];
        current[index] = value;
        onChange({ ...metadata, [key]: current });
    };

    const handleRemoveFeature = (key: 'features' | 'highlights', index: number) => {
        const current = (metadata[key] || []).filter((_, i) => i !== index);
        onChange({ ...metadata, [key]: current });
    };

    // Determine what fields to show based on sectionKey
    const isService = sectionKey.startsWith('service_');
    const isProject = sectionKey.startsWith('project_');
    const isAboutValue = sectionKey.startsWith('about_value');
    const isHeroTrust = sectionKey.startsWith('hero_trust');

    return (
        <div className="space-y-6">
            {/* Icon Picker (if applicable) */}
            {(isService || isAboutValue || isHeroTrust) && (
                <div className="space-y-3">
                    <Label className="text-sm font-semibold">Select Icon</Label>
                    <div className="grid grid-cols-5 gap-2">
                        {ICONS.map((item) => {
                            const Icon = item.icon;
                            const isSelected = metadata.icon === item.name;
                            return (
                                <button
                                    key={item.name}
                                    type="button"
                                    onClick={() => onChange({ ...metadata, icon: item.name })}
                                    className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${isSelected
                                            ? "border-primary bg-primary/5 text-primary ring-1 ring-primary"
                                            : "border-gray-100 hover:border-gray-300 text-muted-foreground"
                                        }`}
                                >
                                    <Icon className="h-5 w-5" />
                                    <span className="text-[10px] truncate w-full text-center">{item.name}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Features / Highlights List */}
            {(isService || isProject) && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-semibold">Features / Points</Label>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-7 px-2 text-[10px] font-bold uppercase tracking-wider"
                            onClick={() => handleAddFeature('features')}
                        >
                            <Plus className="h-3 w-3 mr-1" /> Add Point
                        </Button>
                    </div>
                    <div className="space-y-2">
                        {(metadata.features || []).map((feature, index) => (
                            <div key={index} className="flex gap-2">
                                <Input
                                    value={feature}
                                    onChange={(e) => handleFeatureChange('features', index, e.target.value)}
                                    placeholder="Enter feature..."
                                    className="h-9"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-9 w-9 text-red-500 hover:bg-red-50"
                                    onClick={() => handleRemoveFeature('features', index)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Project Highlights */}
            {isProject && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-semibold">Project Highlights</Label>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-7 px-2 text-[10px] font-bold uppercase tracking-wider"
                            onClick={() => handleAddFeature('highlights')}
                        >
                            <Plus className="h-3 w-3 mr-1" /> Add Highlight
                        </Button>
                    </div>
                    <div className="space-y-2">
                        {(metadata.highlights || []).map((h, index) => (
                            <div key={index} className="flex gap-2">
                                <Input
                                    value={h}
                                    onChange={(e) => handleFeatureChange('highlights', index, e.target.value)}
                                    placeholder="Enter highlight..."
                                    className="h-9"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-9 w-9 text-red-500 hover:bg-red-50"
                                    onClick={() => handleRemoveFeature('highlights', index)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Fallback for other metadata */}
            {(!isService && !isProject && !isAboutValue && !isHeroTrust) && (
                <div className="p-4 rounded-xl bg-gray-50 border-2 border-dashed flex flex-col items-center justify-center">
                    <p className="text-xs text-muted-foreground italic">No specialized form available for this section.</p>
                </div>
            )}
        </div>
    );
}
