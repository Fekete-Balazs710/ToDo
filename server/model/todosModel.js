import mongoose, { Types } from 'mongoose';

const todoSchema = new mongoose.Schema({
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
        default: Date.now()
    }
});

export default mongoose.model('todo', todoSchema);
