import ReadThisWeekComponent from "@/components/ReadThisWeekComponent";
import { ArchiveItem } from "@/interfaces/archieve";
import connectDB from "@/lib/connectDB";
import ArchiveNote from "@/models/ArchiveNote";
import Link from "next/link";

export const metadata = {
    title: "Manage Archive | Admin Dashboard",
    description: "Admin panel to manage archive notes.",
};

type Props = {
    searchParams: { filter?: string };
};

export default async function AdminArchievePage(props: Props) {
    const searchParams = await props.searchParams;
    const filter = searchParams?.filter || 'all';

    await connectDB();

    let query: { visibility?: string } = {}
    if (filter != 'all')
        query.visibility = filter

    const dbNotes = await ArchiveNote.find(query).sort({ date: -1 }).lean();

    const notes: ArchiveItem[] = dbNotes.map(note => ({
        slug: note.slug,
        title: note.title,
        Topics: note.Topics,
        info: note.info,
        Source: note.Source,
        date: note.date,
        visibility: note.visibility as 'public' | 'private'
    }));

    return (
        <section className="py-20 flex flex-col items-center snap-start w-full">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full">
                <div className="flex justify-between items-end mb-8 animate-in slide-in-from-bottom-8 fade-in duration-1000">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight sm:text-3xl lg:text-3xl mb-4 text-transparent bg-clip-text bg-linear-to-r from-primary to-accent inline-block">
                            Manage Archive
                        </h1>
                        <div className="h-1.5 w-20 bg-primary rounded-full"></div>
                    </div>
                    <Link
                        href="/admin/archieve/new"
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors shadow-md"
                    >
                        + New Note
                    </Link>
                </div>

                <div className="flex gap-3 mb-8 animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-150">
                    <Link
                        href="/admin/archieve?filter=all"
                        className={`px-5 py-2 rounded-full text-sm font-medium transition-colors border ${filter === 'all' ? 'bg-primary text-primary-foreground border-primary shadow-sm' : 'bg-card text-muted-foreground border-border hover:bg-secondary hover:text-foreground'}`}
                    >
                        All Notes
                    </Link>
                    <Link
                        href="/admin/archieve?filter=public"
                        className={`px-5 py-2 rounded-full text-sm font-medium transition-colors border ${filter === 'public' ? 'bg-primary text-primary-foreground border-primary shadow-sm' : 'bg-card text-muted-foreground border-border hover:bg-secondary hover:text-foreground'}`}
                    >
                        Public
                    </Link>
                    <Link
                        href="/admin/archieve?filter=private"
                        className={`px-5 py-2 rounded-full text-sm font-medium transition-colors border ${filter === 'private' ? 'bg-primary text-primary-foreground border-primary shadow-sm' : 'bg-card text-muted-foreground border-border hover:bg-secondary hover:text-foreground'}`}
                    >
                        Private
                    </Link>
                </div>
                {notes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-12 mt-8 border border-dashed border-border rounded-xl bg-card/50 text-center">
                        <h2 className="text-xl font-bold text-muted-foreground mb-2">No notes found</h2>
                        <p className="text-sm text-muted-foreground">Have not created any notes yet. Will do it soon!</p>
                    </div>
                ) : (
                    <ReadThisWeekComponent items={notes} hrefPrefix="/admin/archieve" />
                )}
            </div>
        </section>
    );
}
