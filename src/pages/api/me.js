import { getAuthInfoAPI } from "../../middleware/getAuthInfo";
import { User } from "../../utils/schemas";
import connectMongoose from "../../middleware/mongodb";

export default async (req, res) => {
    if (req.method == "GET" && req.headers.host == process.env.HOST) {
        const discordUser = await getAuthInfoAPI(req);
        if (!discordUser) return res.status(400).json({});

        await connectMongoose();
        const user = await User.findOne({ id: discordUser.id });
        if (!user) return res.status(404).json({});

        res.status(200).json({ ...discordUser, ...user.toJSON() });
    } else res.status(403).json({});
};
