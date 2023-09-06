import mongoose, { Document } from 'mongoose';

interface Whitelist extends Document {
    userId: string;
    authToken: string;
}

const whitelistSchema = new mongoose.Schema<Whitelist>({
    userId: {
        type: String,
        required: true
    }, 
    authToken: {
        type: String,
        required: true
    }
});

export default mongoose.model<Whitelist>('Whitelist', whitelistSchema);