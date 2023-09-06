import mongoose, { Document } from 'mongoose';

interface Archive extends Document {
    title: string;
    description?: string;
    priority: string;
    isChecked: boolean;
    date: Date;
    userId: string;
}

const archiveSchema = new mongoose.Schema<Archive>({
    title: {
        type: String,
        required: true
    }, 
    description: {
        type: String
    },
    priority: {
        type: String,
        default: "High"
    },
    isChecked: {
        type: Boolean,
        default: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: String,
        required: true
    }
});

export default mongoose.model<Archive>('Archive', archiveSchema);
