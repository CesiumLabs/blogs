import cookie from "cookie";

export function getAuthID(req) {
    return cookie.parse(req.headers.cookie || {}).auth_id;
}

export function getRank(isAdmin, isDev) {
    if (isAdmin) return 1;
    else if (isDev) return 2;
    else return 3;
}

export const defaultCookieOptions = {
    httpOnly: true,
    secure: true,
    maxAge: 8.64e8,
    domain: process.env.ORIGIN,
    path: "/",
    port: 3000
};
