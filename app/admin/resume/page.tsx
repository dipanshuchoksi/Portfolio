"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Upload, Trash2, FileText, ArrowLeft } from "lucide-react";

export default function ResumeAdminPage() {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/resume", {
                method: "PUT",
                body: formData,
            });

            if (res.ok) {
                alert("Resume uploaded successfully!");
                setFile(null);
                (document.getElementById("resume-upload") as HTMLInputElement).value = "";
                router.refresh();
            } else {
                const data = await res.json();
                alert(`Upload failed: ${data.error}`);
            }
        } catch (error) {
            console.error(error);
            alert("Upload failed.");
        }
        setLoading(false);
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete the resume?")) return;
        setLoading(true);

        try {
            const res = await fetch("/api/resume", {
                method: "DELETE",
            });

            if (res.ok) {
                alert("Resume deleted successfully!");
                router.refresh();
            } else {
                const data = await res.json();
                alert(`Deletion failed: ${data.error}`);
            }
        } catch (error) {
            console.error(error);
            alert("Deletion failed.");
        }
        setLoading(false);
    };

    return (
        <section className="py-20 flex flex-col items-center snap-start w-full min-h-screen">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 w-full">
                <div className="flex justify-between items-center w-full mb-8">
                    <Link href="/admin" className="text-primary inline-flex items-center gap-2 group hover:text-primary/80 transition-colors">
                        <ArrowLeft size={16} />
                        <span>Back to Dashboard</span>
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Manage Resume</h1>
                </div>

                <div className="bg-card/50 backdrop-blur-md rounded-2xl border border-border/50 p-6 md:p-8 space-y-8">
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Upload New Resume</h2>
                            <p className="text-sm text-muted-foreground mt-1">
                                Upload your latest resume in PDF format. This will replace the currently active resume.
                            </p>
                        </div>
                        <form onSubmit={handleUpload} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <div className="flex-1 w-full">
                                <input
                                    id="resume-upload"
                                    type="file"
                                    accept="application/pdf"
                                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                                    disabled={loading}
                                    className="flex h-12 w-full items-center rounded-lg border border-input bg-background/50 px-3 py-2 text-sm text-foreground ring-offset-background transition-colors file:cursor-pointer file:border-0 file:bg-primary/10 file:text-primary file:rounded-md file:px-4 file:py-1 file:mr-4 file:text-sm file:font-medium hover:file:bg-primary/20 hover:bg-muted/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                                />
                            </div>
                            <Button type="submit" disabled={!file || loading} className="w-full sm:w-auto h-12 px-8 font-semibold shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                                {loading ? "Uploading..." : "Upload Resume"}
                                <Upload size={18} className="ml-2" />
                            </Button>
                        </form>
                    </div>

                    <div className="h-px bg-border w-full my-8" />

                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Resume Actions</h2>
                            <p className="text-sm text-muted-foreground mt-1">
                                View the current resume or remove it from the system entirely.
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                            <Button asChild variant="outline" className="h-12 px-6 font-medium transition-all hover:bg-primary/5 hover:text-primary hover:border-primary/30">
                                <a href="/api/resume" target="_blank" rel="noopener noreferrer">
                                    <FileText size={18} className="mr-2 text-primary" />
                                    View & Download
                                </a>
                            </Button>

                            <Button variant="destructive" onClick={handleDelete} disabled={loading} className="h-12 px-6 font-medium transition-all shadow-lg shadow-destructive/20 hover:scale-105 active:scale-95">
                                <Trash2 size={18} className="mr-2" />
                                Delete Resume
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
