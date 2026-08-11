'use client';

import { useState } from 'react';
import { saveMarkdownNote, deleteMarkdownNote } from '@/app/actions/archive';
import { Save, X, Trash } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAuthStatus } from '@/hooks/useAuthStatus';
import { ArchiveItem } from '@/interfaces/archieve';
import NotAuthorized from './NotAuthorized';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const noteSchema = z.object({
    visibility: z.enum(['public', 'private']),
    title: z.string().trim().min(5, "Title should be at least 5 characters long"),
    info: z.string().trim().optional(),
    topics: z.string().trim().min(1, "At least one topic is required"),
    sourceTitle: z.string().trim().optional(),
    sourceUrl: z.string().trim().url("Must be a valid URL").optional().or(z.literal('')),
    content: z.string().trim().min(1, "Content is required"),
});

type NoteFormValues = z.infer<typeof noteSchema>;

interface NoteEditorProps {
    initialContent: string;
    slug: string;
    initialVisibility?: 'public' | 'private';
    initialMetadata?: Partial<ArchiveItem>;
}

export default function NoteEditor({ initialContent, slug, initialVisibility = 'public', initialMetadata }: NoteEditorProps) {
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);

    // Auth state
    const { isLoggedIn, canEdit, authFetched } = useAuthStatus();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<NoteFormValues>({
        resolver: zodResolver(noteSchema),
        defaultValues: {
            visibility: initialVisibility,
            title: initialMetadata?.title || '',
            info: initialMetadata?.info || '',
            topics: initialMetadata?.Topics?.join(', ') || '',
            sourceTitle: initialMetadata?.Source?.title || '',
            sourceUrl: initialMetadata?.Source?.url || '',
            content: initialContent,
        },
    });


    if (authFetched && !canEdit) {
        return <NotAuthorized isLoggedIn={isLoggedIn} actionText='to edit notes' basePage='archive' />;
    }

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this note?")) return;
        setIsSaving(true);
        try {
            await deleteMarkdownNote(slug);
            toast.success("Note deleted successfully!");
            router.push('/admin/archieve');
        } catch (error) {
            console.error("Failed to delete", error);
            toast.error("Failed to delete note");
            setIsSaving(false);
        }
    };

    const onSubmit = async (data: NoteFormValues) => {
        setIsSaving(true);
        try {
            const response = await saveMarkdownNote(slug, data.content, data.visibility, {
                title: data.title,
                info: data.info,
                Topics: data.topics ? data.topics.split(',').map(t => t.trim()).filter(Boolean) : [],
                Source: { title: data.sourceTitle || '', url: data.sourceUrl || '' }
            });
            toast.success("Note saved successfully!");
            router.push(`/admin/archieve`);
        } catch (error) {
            console.error("Failed to save", error);
            toast.error("Failed to save note");
            setIsSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4 -mt-16">
            <div className="flex justify-end mb-2 gap-4">
                <div className="flex gap-2">
                    {slug !== 'new-note' && (
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={isSaving}
                            className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full bg-destructive/10 text-destructive transition-all hover:bg-destructive hover:text-destructive-foreground hover:shadow-md"
                        >
                            <Trash size={16} />
                            <span>Delete</span>
                        </button>
                    )}
                    <Link
                        href={slug === 'new-note' ? '/archieve' : `/archieve/${slug}`}
                        className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full bg-secondary text-secondary-foreground transition-all hover:bg-secondary/80 hover:shadow-md border border-border"
                    >
                        <X size={16} />
                        <span>Cancel</span>
                    </Link>
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full bg-primary text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-md"
                    >
                        <Save size={16} />
                        <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-6 p-4 rounded-xl border border-border bg-card/50">
                    <span className="text-sm font-semibold text-muted-foreground">Visibility:</span>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            value="public"
                            {...register("visibility")}
                            className="text-primary focus:ring-primary accent-primary"
                        />
                        <span className="text-sm font-medium">Public</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            value="private"
                            {...register("visibility")}
                            className="text-primary focus:ring-primary accent-primary"
                        />
                        <span className="text-sm font-medium">Private</span>
                    </label>
                </div>

                <div className="flex flex-col gap-3 p-4 rounded-xl border border-border bg-card/50">
                    <div>
                        <label className="text-sm font-semibold text-muted-foreground">Title:</label>
                        <input type="text" {...register("title")} className="w-full p-2 rounded-md border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                        {errors.title && <p className="text-destructive text-xs mt-1">{errors.title.message}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-muted-foreground">Description (info):</label>
                        <input type="text" {...register("info")} className="w-full p-2 rounded-md border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-muted-foreground">Topics (comma separated):</label>
                        <input type="text" {...register("topics")} className="w-full p-2 rounded-md border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                        {errors.topics && <p className="text-destructive text-xs mt-1">{errors.topics.message}</p>}
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1 flex flex-col gap-2">
                            <label className="text-sm font-semibold text-muted-foreground">Source Title:</label>
                            <input type="text" {...register("sourceTitle")} className="w-full p-2 rounded-md border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                        </div>
                        <div className="flex-1 flex flex-col gap-2">
                            <label className="text-sm font-semibold text-muted-foreground">Source URL:</label>
                            <input type="text" {...register("sourceUrl")} className="w-full p-2 rounded-md border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                            {errors.sourceUrl && <p className="text-destructive text-xs mt-1">{errors.sourceUrl.message}</p>}
                        </div>
                    </div>
                </div>
                <div>
                    <textarea
                        {...register("content")}
                        className="w-full min-h-125 p-4 rounded-xl border border-border bg-card font-mono text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="Write your markdown here..."
                    />
                    {errors.content && <p className="text-destructive text-xs mt-1 ml-2">{errors.content.message}</p>}
                </div>
            </div>
        </form>
    );
}
