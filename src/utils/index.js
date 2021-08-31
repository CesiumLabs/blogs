import cookie from "cookie";
import mongoose from "mongoose";

export function getAuthID(req) {
    return cookie.parse(req.headers.cookie || "").auth_id;
}

export function getRank(isAdmin, isDev) {
    if (isAdmin) return 1;
    else if (isDev) return 2;
    else return 3;
}

export function createSimplifiedJSONBlog(doc) {
    return {
        id: doc.id,
        name: doc.name,
        description: doc.description,
        thumbnail: doc.thumbnail,
        tags: doc.tags,
        createdAt: Date.parse(doc.createdAt),
        author: mongoose.staffs.get(doc.author)
    };
}

export const defaultCookieOptions = {
    httpOnly: true,
    secure: true,
    maxAge: 8.64e8,
    domain: process.env.ORIGIN,
    path: "/",
    port: 3000
};

export const staffs = new Map();
