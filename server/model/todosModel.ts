import mongoose, { Types } from 'mongoose';

export interface Todo {
    title: string,
    description?: string,
    priority: string,
    isChecked: boolean,
    userId: Types.ObjectId
} 

const userSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }, 
    desctiption: {
        type: String
    },
    priority: {
        type: String,
        required: true
    },
    isChecked: {
        type: Boolean,
        default: true
    },
    userId: {
        type: Types.ObjectId,
        required: true
    }
});

export default mongoose.model('todo', userSchema);
