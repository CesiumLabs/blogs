import axios from "axios";
import cookie from "cookie";
import { defaultCookieOptions } from "../utils";

export default async function getAuthInfo({ req, res }) {
    res.redirect = (x) => res.writeHead(302, { Location: x }).end();
    const { auth_id } = cookie.parse(req.headers.cookie || "");
    if (!auth_id) return res.redirect("/api/panel/login");

    try {
        const { data } = await axios.get("https://backend.snowflakedev.org/api/authorize", {
            headers: { authorization: `Bearer ${auth_id}` }
        });

        return data.data;
    } catch (e) {
        res.setHeader("Set-Cookie", [cookie.serialize("auth_id", "", defaultCookieOptions), cookie.serialize("rank", 0, defaultCookieOptions)]);
        return res.redirect("/api/panel/login");
    }
}

export async function getAuthInfoAPI(req) {
    const { auth_id } = cookie.parse(req.headers.cookie || "");
    if (!auth_id) return null;

    try {
        const { data } = await axios.get("https://backend.snowflakedev.org/api/authorize", { headers: { authorization: `Bearer ${auth_id}` } });
        return data.data;
    } catch (e) {
        return null;
    }
}
