import { User } from "../../../utils/schemas";
import { getAuthInfoAPI } from "../../../middleware/getAuthInfo";
import connectMongoose from "../../../middleware/mongodb";

const headerKeys = ["bio", "twitter", "github", "website", "banner"];

export default async (req, res) => {
    if (req.method == "POST" && req.headers.host == process.env.HOST) {
        await connectMongoose();
        const discordUser = await getAuthInfoAPI(req);
        if (!discordUser) return res.status(403).end();

        const newUser = {};
        for (const key of headerKeys) newUser[key] = req.headers[key] ?? null;

        await User.findOneAndUpdate({ id: discordUser.id }, newUser);
        res.status(204).end();
    } else res.status(403).json({});
};
