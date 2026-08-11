'use server';

import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/connectDB';
import Project from '@/models/Project';
import { s3Client, S3_BUCKET } from '@/lib/s3';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getAuthStatus } from '@/app/actions/auth';

async function uploadImageIfPresent(file: File | null): Promise<{ success: boolean; url?: string; error?: string }> {
    if (!file || file.size === 0) return { success: true };

    const buffer = Buffer.from(await file.arrayBuffer());
    const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '');
    const extIndex = safeName.lastIndexOf('.');
    const ext = extIndex !== -1 ? safeName.substring(extIndex) : '';
    const name = extIndex !== -1 ? safeName.substring(0, extIndex) : safeName;
    const uniqueFileName = `${name}-${Date.now()}${ext}`;
    const s3Key = `public/projects/${uniqueFileName}`;

    let contentType = 'application/octet-stream';
    if (ext === '.png') contentType = 'image/png';
    else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
    else if (ext === '.gif') contentType = 'image/gif';
    else if (ext === '.svg') contentType = 'image/svg+xml';
    else if (ext === '.webp') contentType = 'image/webp';

    try {
        await s3Client.send(new PutObjectCommand({
            Bucket: S3_BUCKET,
            Key: s3Key,
            Body: buffer,
            ContentType: contentType,
        }));
        return { success: true, url: s3Key };
    } catch (error: any) {
        return { success: false, error: 'Failed to upload image: ' + error.message };
    }
}

export async function createProject(formData: FormData) {
    const { canEdit } = await getAuthStatus();
    if (!canEdit) return { success: false, error: 'Unauthorized' };

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const tagsString = formData.get('tags') as string;
    const github = formData.get('github') as string;
    const live = formData.get('live') as string;
    const status = formData.get('status') as string;
    let image = formData.get('image') as string;
    const file = formData.get('imageFile') as File | null;

    const uploadResult = await uploadImageIfPresent(file);
    if (!uploadResult.success) return uploadResult;
    if (uploadResult.url) image = uploadResult.url;

    let finalSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    if (!finalSlug) finalSlug = `project-${Date.now()}`;

    const tags = tagsString ? tagsString.split(",").map(t => t.trim()).filter(Boolean) : [];
    const links = { github: github || "", live: live || "" };

    await connectDB();
    await Project.create({
        slug: finalSlug,
        title,
        description,
        image,
        tags,
        links,
        status,
    });

    revalidatePath('/');
    revalidatePath('/projects');
    return { success: true, slug: finalSlug };
}

export async function updateProject(slug: string, formData: FormData) {
    const { canEdit } = await getAuthStatus();
    if (!canEdit) return { success: false, error: 'Unauthorized' };

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const tagsString = formData.get('tags') as string;
    const github = formData.get('github') as string;
    const live = formData.get('live') as string;
    const status = formData.get('status') as string;
    let image = formData.get('image') as string;
    const file = formData.get('imageFile') as File | null;

    const uploadResult = await uploadImageIfPresent(file);
    if (!uploadResult.success) return uploadResult;
    if (uploadResult.url) image = uploadResult.url;

    const tags = tagsString ? tagsString.split(",").map(t => t.trim()).filter(Boolean) : [];
    const links = { github: github || "", live: live || "" };

    await connectDB();
    await Project.findOneAndUpdate(
        { slug },
        {
            $set: {
                title,
                description,
                image,
                tags,
                links,
                status,
            }
        },
        { new: true }
    );

    revalidatePath('/');
    revalidatePath('/projects');
    return { success: true, slug };
}

export async function deleteProject(slug: string) {
    const { canEdit } = await getAuthStatus();
    if (!canEdit) {
        return { success: false, error: 'Unauthorized' };
    }
    await connectDB();
    await Project.findOneAndDelete({ slug });

    revalidatePath('/');
    revalidatePath('/projects');

    return { success: true };
}
