import mongoose, { Document } from 'mongoose';

interface Todo extends Document {
    title: string;
    description?: string;
    priority: string;
    isChecked: boolean;
    date: Date;
    userId: string;
}

const todoSchema = new mongoose.Schema<Todo>({
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

export default mongoose.model<Todo>('Todo', todoSchema);
