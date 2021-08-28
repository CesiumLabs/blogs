import mongoose, { Schema } from "mongoose";

const blog = new Schema({
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

const user = new Schema({
    id: {
        type: String,
        required: true
    },
    rank: {
        type: Number,
        required: true
    }, // 1 means admin, 2 means developer and 3 means moderator staff
    github: String,
    twitter: String,
    website: String,
    bio: String
});

mongoose.models = {};
export const Blog = mongoose.model('blogs', blog);
export const User = mongoose.model('users', user);