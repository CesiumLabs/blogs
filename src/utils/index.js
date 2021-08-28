import axios from 'axios';
import cookie from "cookie";

export function getAuthID(req) {
    return cookie.parse(req.headers.cookie || "").auth_id;
}

export async function getAuthUserInfo(req) {
    const authID = getAuthID(req);
    if (!authID) return null;

    const { data } = await axios.get("https://backend.snowflakedev.org/api/authorize", {
        headers: { 
            redirect_uri: `${process.env.URL}/authorize/callback`,
            authorization: `Bearer ${authID}`
        }
    });

    return data.data;
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
