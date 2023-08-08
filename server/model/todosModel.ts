import mongoose from 'mongoose';
import { Types } from 'mongoose';

var Schema = mongoose.Schema;

var userSchema = new Schema({
    title: {
        type: String,
        required: true
    }, 
    desctiption: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    isChecked: {
        type: Boolean,
        required: true
    },
    userID: {
        type: Types.ObjectId,
        required: true
    }
});

export default mongoose.model('todos', userSchema);