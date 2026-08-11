import mongoose, { Schema, Document } from 'mongoose';
import { project } from '@/interfaces';

interface IProject extends Document, project {
    slug: string;
}

const ProjectSchema: Schema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: String, default: '/placeholder.svg' },
    tags: { type: [String], default: [] },
    links: {
        github: { type: String, default: '' },
        live: { type: String, default: '' }
    },
    status: { type: String, enum: ['Active', 'WIP'], default: 'Active' }
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
