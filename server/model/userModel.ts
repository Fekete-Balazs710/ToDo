import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    }, 
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

export default mongoose.model('users', userSchema);