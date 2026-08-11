import mongoose, { Schema, Document } from 'mongoose';

import { ArchiveItem } from '@/interfaces/archieve';

interface IArchiveNote extends Document, ArchiveItem {}

const ArchiveNoteSchema: Schema = new Schema({
    slug: { type: String, required: true, unique: true },
    title: { type: String, default: '' },
    Topics: { type: [String], default: [] },
    info: { type: String, default: '' },
    Source: {
        title: { type: String, default: '' },
        url: { type: String, default: '' }
    },
    date: { type: Date, default: Date.now },
    visibility: { type: String, enum: ['public', 'private'], default: 'public' }
});

export default mongoose.models.ArchiveNote || mongoose.model<IArchiveNote>('ArchiveNote', ArchiveNoteSchema);
