import { v4 as uuid } from "uuid";
import { Blog } from "../../../utils/schemas";
import { getAuthInfoAPI } from "../../../middleware/getAuthInfo";

export default async (req, res) => {
    if (req.method == "PUT" && req.headers.host == process.env.HOST) {
        const discordUser = await getAuthInfoAPI(req);
        if (!discordUser) return res.status(403).end();

        const blog = await new Blog({
            id: uuid(),
            name: req.headers.name,
            description: req.headers.description,
            tags: req.headers.tags.split(","),
            thumbnail: req.headers.thumbnail,
            author: discordUser.id,
            content: decodeURIComponent(req.headers.content)
        }).save();

        res.status(200).json({ id: blog.id });
    } else res.status(403).json({});
};
