import ReactMarkdown from 'react-markdown';

export default function RenderMarkdown({ title, content }: { title?: string, content: string }) {
    return (
        <div className="prose prose-lg dark:prose-invert max-w-none border border-transparent p-4">
            {title && <h1 className="mb-6 font-bold text-4xl">{title}</h1>}
            <ReactMarkdown>{content}</ReactMarkdown>
        </div>
    );
}
