import axios from "axios";
import cookie from "cookie";
import { defaultCookieOptions } from "../utils";

export default async function getAuthInfo({ req, res }) {
    const { auth_id } = cookie.parse(req.headers.cookie || "");
    if (!auth_id) return null;
    if (global.authCache.has(auth_id)) return global.authCache.get(auth_id);

    try {
        const { data } = await axios.get("https://backend.snowflakedev.cf/api/authorize", { headers: { authorization: `Bearer ${auth_id}` } });
        global.authCache.set(auth_id, data.data);
        return data.data;
    } catch (e) {
        res.setHeader("Set-Cookie", [cookie.serialize("auth_id", "", defaultCookieOptions), cookie.serialize("rank", 0, defaultCookieOptions)]);
        return null;
    }
}

export async function getAuthInfoAPI(req) {
    const { auth_id } = cookie.parse(req.headers.cookie || "");
    if (!auth_id) return null;
    if (global.authCache.has(auth_id)) return global.authCache.get(auth_id);

    try {
        const { data } = await axios.get("https://backend.snowflakedev.cf/api/authorize", { headers: { authorization: `Bearer ${auth_id}` } });
        global.authCache.set(auth_id, data.data);
        return data.data;
    } catch (e) {
        return null;
    }
}
