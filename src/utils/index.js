import cookie from 'cookie';

export function getAuthID(req) {
    return cookie.parse(req.headers.cookie || {}).auth_id;
}