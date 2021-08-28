import cookie from 'cookie';

export function getAuthID(req) {
    return cookie.parse(req.headers.cookie || {}).auth_id;
}

export const defaultCookieOptions = {
    httpOnly: true,
    secure: true,
    maxAge: 8.64e+8,
    domain: process.env.ORIGIN,
    path: '/',
    port: 3000
};