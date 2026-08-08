'use server';

import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/connectDB';
import ArchiveNote from '@/models/ArchiveNote';
import { s3Client, S3_BUCKET } from '@/lib/s3';
import { PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

export async function saveMarkdownNote(
    slug: string,
    content: string,
    visibility: 'public' | 'private' = 'public',
    metadata?: { title?: string; info?: string; Topics?: string[]; Source?: { title: string; url: string; } }
) {
    let finalSlug = slug;
    if (finalSlug === 'new-note' && metadata?.title) {
        finalSlug = metadata.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        if (!finalSlug) finalSlug = `note-${Date.now()}`;
    }

    const s3Key = `archieve/${finalSlug}.md`;

    await s3Client.send(new PutObjectCommand({
        Bucket: S3_BUCKET,
        Key: s3Key,
        Body: content,
        ContentType: 'text/markdown',
    }));

    await connectDB();
    await ArchiveNote.findOneAndUpdate(
        { slug: finalSlug },
        {
            $setOnInsert: {
                date: new Date()
            },
            $set: {
                visibility,
                ...(metadata?.title !== undefined && { title: metadata.title }),
                ...(metadata?.info !== undefined && { info: metadata.info }),
                ...(metadata?.Topics !== undefined && { Topics: metadata.Topics }),
                ...(metadata?.Source !== undefined && { Source: metadata.Source })
            }
        },
        { upsert: true, new: true }
    );

    revalidatePath(`/archieve/${finalSlug}`);
    revalidatePath('/archieve');

    return { success: true, slug: finalSlug };
}

export async function deleteMarkdownNote(slug: string) {
    await connectDB();
    await ArchiveNote.findOneAndDelete({ slug });

    const s3Key = `archieve/${slug}.md`;
    
    try {
        await s3Client.send(new DeleteObjectCommand({
            Bucket: S3_BUCKET,
            Key: s3Key,
        }));
    } catch (e) {
        console.error("Failed to delete from S3:", e);
    }

    revalidatePath('/archieve');

    return { success: true };
}
