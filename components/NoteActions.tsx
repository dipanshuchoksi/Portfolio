'use client';

import { useState } from 'react';
import { Download, Copy, Check } from 'lucide-react';

export default function NoteActions({ content, slug }: { content: string; slug: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const blob = new Blob([content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${slug}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="flex items-center gap-4">
            <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full bg-primary/10 text-primary transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-md border border-primary/20"
            >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
            <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full bg-primary/10 text-primary transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-md border border-primary/20"
            >
                <Download size={16} />
                <span>Download</span>
            </button>
        </div>
    );
}
