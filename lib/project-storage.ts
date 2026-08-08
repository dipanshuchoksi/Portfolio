import { saveProject, deleteProject } from "@/app/actions/project";
import { uploadImageToS3 } from "@/app/actions/upload";

export async function handleProjectSave(
    slug: string,
    data: any,
    image: string,
    imageFile: File | null
) {
    let finalImageUrl = image;

    if (imageFile) {
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);

        await new Promise((resolve, reject) => {
            reader.onload = async () => {
                try {
                    const base64Data = reader.result as string;
                    const ext = imageFile.name.split('.').pop();
                    const kebabTitle = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                    const filename = `${kebabTitle || 'project'}.${ext}`;
                    const result = await uploadImageToS3(filename, base64Data, 'public/projects');

                    if (result.success && result.filePath) {
                        finalImageUrl = result.filePath;
                    } else {
                        throw new Error(`Image upload failed: ${result.error}`);
                    }
                    resolve(null);
                } catch (err) {
                    reject(err);
                }
            };
            reader.onerror = reject;
        });
    }

    const payload = {
        title: data.title,
        description: data.description,
        image: finalImageUrl,
        tags: data.tags ? data.tags.split(",").map((t: string) => t.trim()).filter(Boolean) : [],
        links: { github: data?.github ?? "", live: data?.live ?? "" },
        status: data.status
    };

    return await saveProject(slug, payload);
}

export async function handleProjectDelete(slug: string) {
    return await deleteProject(slug);
}
