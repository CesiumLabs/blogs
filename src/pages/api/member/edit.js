import { User } from "../../../utils/schemas";
import { getAuthInfoAPI } from "../../../middleware/getAuthInfo";

const headerKeys = ["bio", "twitter", "github", "website"];

export default async (req, res) => {
    if (req.method == "POST" && req.headers.host == process.env.HOST) {
        const discordUser = await getAuthInfoAPI(req);
        if (!discordUser) return res.status(403).end();

        const newUser = {};
        for (const key of headerKeys) if (req.headers[key]) newUser[key] = req.headers[key];

        await User.findOneAndUpdate({ id: discordUser.id }, newUser);
        res.status(204).end();
    } else res.status(403).json({});
};
