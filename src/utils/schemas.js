import mongoose, { Schema } from "mongoose";

const Blog = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    author: { 
        type: String, 
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

mongoose.models = {};
export default mongoose.model('blogs', Blog);