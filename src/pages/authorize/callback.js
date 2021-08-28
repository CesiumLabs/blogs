import cookie from "cookie";
import { useEffect } from "react";
import axios from "axios";
import connectMongoose from "../../middleware/mongodb";
import { User } from "../../utils/schemas";
import { getAuthID, getRank, defaultCookieOptions } from "../../utils";

export default function Callback({ redirect, forbidden, error }) {
    useEffect(() => {
        if (redirect) window.location.href = "/";
        else if (error) window.location.href = "/api/panel/login";
    });

    if (redirect) return "Redirecting you...";
    else if (forbidden) return "You are not allowed to enter the admin panel...";
    else return null;
}

Callback.getInitialProps = async (ctx) => {
    if (!ctx.query.code || getAuthID(ctx.req)?.length) return { redirect: true };

    try {
        const { data } = await axios.get("https://backend.snowflakedev.org/api/authorize", {
            headers: { redirect_uri: `${process.env.URL}/authorize/callback` },
            params: { code: ctx.query.code }
        });

        const { data: staffs } = await axios.get("https://api.snowflakedev.org/api/d/staffs");
        const staff = staffs.data.find((x) => x.id === data.data.id);
        if (!staff) return { forbidden: true };

        ctx.res.setHeader("Set-Cookie", [cookie.serialize("auth_id", data.data.accessToken, defaultCookieOptions)]);
        await connectMongoose();

        const user = await User.findOne({ id: data.data.id });
        if (!user) await new User({ id: data.data.id, rank: getRank(staff.admin, staff.dev) }).save();

        return { redirect: true };
    } catch (e) {
        return { error: true };
    }
};
