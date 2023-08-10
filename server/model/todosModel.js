import mongoose, { Types } from 'mongoose';

// export interface Todo {
//     title: string,
//     description?: string,
//     priority: string,
//     isChecked: boolean,
//     userId: Types.ObjectId
// } 

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
    isEditing: {
        type: Boolean,
        default: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true
    // }
});

export default mongoose.model('todo', todoSchema);
