import Link from 'next/link';
import NoteEditor from '@/components/NoteEditor';

export default function NewNotePage() {
    return (
        <section className="py-20 flex flex-col items-center snap-start w-full min-h-screen">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 w-full">
                <div className="flex justify-between items-center w-full mb-8">
                    <Link href="/admin/archieve" className="text-primary inline-block group">
                        <span className="nav-link-underline">
                            &larr; Back to Archive
                        </span>
                    </Link>
                </div>
                <h1 className="text-3xl font-bold mb-6">Create New Note</h1>
                <NoteEditor initialContent={"Start typing your note here..."} slug="new-note" />
            </div>
        </section>
    );
}
