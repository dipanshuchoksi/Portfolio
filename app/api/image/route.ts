import { NextRequest, NextResponse } from "next/server";
import { s3Client, S3_BUCKET } from "@/lib/s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const imageUrl = url.searchParams.get("url");

    if (!imageUrl) {
        return new NextResponse("Missing url parameter", { status: 400 });
    }

    // Extract the key from the S3 URL
    let key = imageUrl;
    if (imageUrl.includes(".amazonaws.com/")) {
        key = imageUrl.split(".amazonaws.com/")[1];
    }

    try {
        const command = new GetObjectCommand({
            Bucket: S3_BUCKET,
            Key: key,
        });
        const response = await s3Client.send(command);
        const byteArray = await response.Body?.transformToByteArray();

        return new NextResponse(byteArray as any, {
            headers: {
                "Content-Type": response.ContentType || "application/octet-stream",
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        });
    } catch (error) {
        console.error("Error fetching image from S3:", error);
        return new NextResponse("Image not found", { status: 404 });
    }
}
