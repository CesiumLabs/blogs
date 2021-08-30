import cookie from "cookie";

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
        updatedAt: doc.updatedAt,
        author: doc.author
    }
}

export const defaultCookieOptions = {
    httpOnly: true,
    secure: true,
    maxAge: 8.64e8,
    domain: process.env.ORIGIN,
    path: "/",
    port: 3000
};
