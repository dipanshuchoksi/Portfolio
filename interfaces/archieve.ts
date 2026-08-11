export type ArchiveItem = {
    slug: string;
    title: string;
    Topics: string[];
    info: string;
    Source: {
        title: string;
        url: string;
    };
    date: Date;
    visibility: 'public' | 'private';
};
