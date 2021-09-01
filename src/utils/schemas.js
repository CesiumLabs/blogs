import mongoose, { Schema } from "mongoose";

const blog = new Schema({
    id: {
        type: String,
        required: true
    },
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
    banner: String,
    github: String,
    twitter: String,
    website: String,
    bio: String
});

export const Blog = mongoose.models?.blogs || mongoose.model("blogs", blog);
export const User = mongoose.models?.users || mongoose.model("users", user);
