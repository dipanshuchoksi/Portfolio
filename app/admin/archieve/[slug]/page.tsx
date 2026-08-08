import { notFound } from 'next/navigation';
import Link from 'next/link';
import connectDB from '@/lib/connectDB';
import ArchiveNote from '@/models/ArchiveNote';
import NoteEditor from '@/components/NoteEditor';
import { ArchiveItem } from '@/interfaces/archieve';
import { s3Client, S3_BUCKET } from "@/lib/s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";

export default async function AdminNoteEditPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;

    await connectDB();
    const dbNote = await ArchiveNote.findOne({ slug }).lean();

    const s3Key = `archieve/${slug}.md`;
    let content = "";
    try {
        const response = await s3Client.send(new GetObjectCommand({
            Bucket: S3_BUCKET,
            Key: s3Key,
        }));
        content = await response.Body?.transformToString() || "";
    } catch (e) {
        notFound();
    }

    const initialMetadata: Partial<ArchiveItem> | undefined = dbNote ? {
        title: dbNote.title,
        info: dbNote.info,
        Topics: dbNote.Topics,
        Source: dbNote.Source
    } : undefined;

    return (
        <section className="py-20 flex flex-col items-center snap-start w-full min-h-screen">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 w-full">
                <div className="flex justify-between items-center w-full mb-8">
                    <Link href="/admin/archieve" className="text-primary inline-block group">
                        <span className="nav-link-underline">
                            &larr; Back to Admin Archive
                        </span>
                    </Link>
                </div>
                <NoteEditor
                    initialContent={content}
                    slug={slug}
                    initialVisibility={dbNote?.visibility as 'public' | 'private' || 'public'}
                    initialMetadata={initialMetadata}
                />
            </div>
        </section>
    );
}
