import { NextRequest, NextResponse } from "next/server";
import { s3Client, S3_BUCKET } from "@/lib/s3";
import { GetObjectCommand, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getAuthStatus } from "@/app/actions/auth";

const RESUME_KEY = "public/Resume_Dipanshu_Choksi.pdf";

export async function GET() {
    try {
        const command = new GetObjectCommand({
            Bucket: S3_BUCKET,
            Key: RESUME_KEY,
        });
        const response = await s3Client.send(command);
        const byteArray = await response.Body?.transformToByteArray();

        return new NextResponse(byteArray as any, {
            headers: {
                "Content-Type": response.ContentType || "application/pdf",
                "Content-Disposition": 'attachment; filename="Resume_Dipanshu_Choksi.pdf"',
                "Cache-Control": "public, max-age=3600, must-revalidate",
            },
        });
    } catch (error) {
        console.error("Error fetching resume from S3:", error);
        return new NextResponse("Resume not found", { status: 404 });
    }
}

export async function PUT(req: NextRequest) {
    const { canEdit } = await getAuthStatus();
    if (!canEdit) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;
        if (!file) {
            return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        await s3Client.send(new PutObjectCommand({
            Bucket: S3_BUCKET,
            Key: RESUME_KEY,
            Body: buffer,
            ContentType: file.type || 'application/pdf',
        }));

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Error uploading resume:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE() {
    const { canEdit } = await getAuthStatus();
    if (!canEdit) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    try {
        await s3Client.send(new DeleteObjectCommand({
            Bucket: S3_BUCKET,
            Key: RESUME_KEY,
        }));

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Error deleting resume:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
