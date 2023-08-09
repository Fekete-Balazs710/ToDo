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
    desciption: {
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
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

export default mongoose.model('todo', todoSchema);
