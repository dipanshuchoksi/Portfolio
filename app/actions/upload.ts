'use server';

import { getAuthStatus } from '@/app/actions/auth';
import { s3Client, S3_BUCKET } from '@/lib/s3';
import { PutObjectCommand } from '@aws-sdk/client-s3';

export async function uploadImageToS3(fileName: string, base64Data: string, folder: string = 'projects') {
    const { canEdit } = await getAuthStatus();
    if (!canEdit) {
        return { success: false, error: 'Unauthorized' };
    }

    if (!S3_BUCKET) {
        return { success: false, error: 'S3 bucket not configured' };
    }

    // Clean up base64 string if it contains the data URI prefix (e.g., data:image/png;base64,...)
    const base64Content = base64Data.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Content, 'base64');

    // Create a safe, unique filename
    const safeName = fileName.replace(/[^a-zA-Z0-9.\-_]/g, '');
    const extIndex = safeName.lastIndexOf('.');
    const ext = extIndex !== -1 ? safeName.substring(extIndex) : '';
    const name = extIndex !== -1 ? safeName.substring(0, extIndex) : safeName;
    const uniqueFileName = `${name}-${Date.now()}${ext}`;

    const s3Key = `${folder}/${uniqueFileName}`;

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

        const region = process.env.AWS_REGION || "us-east-1";
        const rawUrl = `https://${S3_BUCKET}.s3.${region}.amazonaws.com/${s3Key}`;

        return { success: true, url: rawUrl, filePath: s3Key };
    } catch (error: any) {
        return { success: false, error: error.message || 'Unknown error occurred' };
    }
}
