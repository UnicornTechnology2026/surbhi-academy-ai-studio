import React, { useRef, useState } from 'react';
import { UploadCloud, X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

const STORAGE_BUCKET = 'academy-images';

interface ImageUploadProps {
    label?: string;
    value?: string;
    onChange: (dataUrl: string) => void;
    helperText?: string;
    aspectRatio?: 'landscape' | 'portrait' | 'square' | 'video';
    maxSizeMB?: number;
    className?: string;
    theme?: 'dark' | 'light';
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
    label = 'Cover Image / Photo',
    value,
    onChange,
    helperText = 'PNG, JPG, WebP up to 5MB (Drag & drop or click to browse)',
    aspectRatio = 'landscape',
    maxSizeMB = 5,
    className = '',
    theme = 'dark'
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string>('');
    const [isProcessing, setIsProcessing] = useState(false);

    const isDark = theme === 'dark';

    const aspectClass = {
        landscape: 'aspect-16/9 sm:aspect-21/9',
        portrait: 'aspect-3/4',
        square: 'aspect-square',
        video: 'aspect-video'
    }[aspectRatio];

    const handleFileProcess = async (file: File) => {
        setError('');

        if (!file.type.startsWith('image/')) {
            setError('Please select a valid image file (PNG, JPG, WebP, SVG)');
            return;
        }

        const maxSizeBytes = maxSizeMB * 1024 * 1024;
        if (file.size > maxSizeBytes) {
            setError(`Image size exceeds ${maxSizeMB}MB. Please upload a smaller image.`);
            return;
        }

        setIsProcessing(true);

        try {
            const extension = file.name.split('.').pop() || 'jpg';
            const path = `${crypto.randomUUID()}.${extension}`;

            const { error: uploadError } = await supabase.storage
                .from(STORAGE_BUCKET)
                .upload(path, file, { cacheControl: '3600', upsert: false });

            if (uploadError) {
                throw uploadError;
            }

            const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
            onChange(data.publicUrl);
        } catch (err) {
            setError(
                err instanceof Error
                    ? `Upload failed: ${err.message}`
                    : 'Failed to upload image. Please try again.'
            );
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFileProcess(e.dataTransfer.files[0]);
        }
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFileProcess(e.target.files[0]);
        }
    };

    const handleRemoveImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className={`space-y-1.5 ${className}`}>
            {label && (
                <div className="flex items-center justify-between">
                    <label className={`block uppercase font-bold text-[11px] tracking-wider ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        {label}
                    </label>
                    {value && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-500 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/60">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Image Attached</span>
                        </span>
                    )}
                </div>
            )}

            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml"
                onChange={handleFileInputChange}
                className="hidden"
            />

            {/* Dropzone Container */}
            <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative w-full rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden group ${isDragging
                        ? isDark
                            ? 'border-amber-400 bg-amber-500/10 scale-[1.008]'
                            : 'border-amber-500 bg-amber-50 scale-[1.008]'
                        : value
                            ? isDark
                                ? 'border-slate-700 bg-slate-950 hover:border-amber-400/70'
                                : 'border-slate-300 bg-slate-50 hover:border-amber-400'
                            : isDark
                                ? 'border-slate-800 bg-slate-950/70 hover:border-slate-700 hover:bg-slate-950'
                                : 'border-slate-300 bg-slate-50 hover:border-slate-400 hover:bg-white'
                    }`}
            >
                {value ? (
                    /* Preview State */
                    <div className={`relative w-full ${aspectClass} overflow-hidden bg-black/40 flex items-center justify-center`}>
                        <img
                            src={value}
                            alt="Uploaded Preview"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />

                        <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 p-4">
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    fileInputRef.current?.click();
                                }}
                                className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs backdrop-blur-md transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
                            >
                                <UploadCloud className="w-3.5 h-3.5" />
                                <span>Replace Image</span>
                            </button>

                            <button
                                type="button"
                                onClick={handleRemoveImage}
                                className="px-3 py-1.5 rounded-xl bg-red-600/80 hover:bg-red-600 text-white font-bold text-xs backdrop-blur-md transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
                            >
                                <X className="w-3.5 h-3.5" />
                                <span>Remove</span>
                            </button>
                        </div>
                    </div>
                ) : (
                    /* Empty Upload Placeholder State */
                    <div className="p-6 text-center flex flex-col items-center justify-center gap-2">
                        <div
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm ${isDark ? 'bg-slate-800/80 text-amber-400' : 'bg-amber-100 text-amber-700'
                                }`}
                        >
                            {isProcessing ? (
                                <div className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <UploadCloud className="w-6 h-6" />
                            )}
                        </div>

                        <div className="space-y-1">
                            <div className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                                <span className="text-amber-400 underline underline-offset-2">Click to select image</span> or drag and drop from device
                            </div>
                            <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                {helperText}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {error && (
                <div className="text-[11px] text-rose-400 flex items-center gap-1.5 pt-0.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
};