import { Blog } from "../../../utils/schemas";
import { getAuthInfoAPI } from "../../../middleware/getAuthInfo";

export default async (req, res) => {
    if (req.method == "DELETE" && req.headers.host == process.env.HOST) {
        const discordUser = await getAuthInfoAPI(req);
        if (!discordUser) return res.status(403).end();
        await Blog.findOneAndDelete({ id: req.query.id, author: discordUser.id });
        res.status(204).end();
    } else res.status(403).json({});
};
