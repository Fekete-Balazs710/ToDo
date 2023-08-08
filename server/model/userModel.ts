import mongoose from 'mongoose';

export interface User {
    firstName: string,
    lastName: string,
    password: string,
    email: string,
}

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    }, 
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    }
});

export default mongoose.model('user', userSchema);