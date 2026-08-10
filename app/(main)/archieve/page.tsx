import ReadThisWeekComponent from "@/components/ReadThisWeekComponent";
import { ArchiveItem } from "@/interfaces/archieve";
import connectDB from "@/lib/connectDB";
import ArchiveNote from "@/models/ArchiveNote";

export const metadata = {
    title: "Archive | Dipanshu Choksi",
    description: "A comprehensive list of what I'm learning.",
};

type Props = {
    searchParams: { filter?: string };
};

export default async function ArchievePage(props: Props) {
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
        <section className=" py-0 sm:py-20 flex flex-col items-center snap-start w-full">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full">
                <div className="flex justify-between items-end mb-8 animate-in slide-in-from-bottom-8 fade-in duration-1000">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight sm:text-3xl lg:text-3xl mb-4 text-transparent bg-clip-text bg-linear-to-r from-primary to-accent inline-block">
                            Archive
                        </h1>
                        <div className="h-1.5 w-20 bg-primary rounded-full"></div>
                    </div>
                </div>

                {notes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-12 mt-8 border border-dashed border-border rounded-xl bg-card/50 text-center">
                        <h2 className="text-xl font-bold text-muted-foreground mb-2">No notes found</h2>
                        <p className="text-sm text-muted-foreground">Check back later for new notes!</p>
                    </div>
                ) : (
                    <ReadThisWeekComponent items={notes} />
                )}
            </div>
        </section>
    );
}
