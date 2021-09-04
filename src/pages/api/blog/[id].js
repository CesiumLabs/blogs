import { Blog } from "../../../utils/schemas";
import { getAuthInfoAPI } from "../../../middleware/getAuthInfo";
import connectMongoose from "../../middleware/mongodb";

export default async (req, res) => {
    if (req.headers.host == process.env.HOST) {
        await connectMongoose();
        
        if (req.method == "DELETE") {
            const discordUser = await getAuthInfoAPI(req);
            if (!discordUser) return res.status(403).end();
            await Blog.findOneAndDelete({ id: req.query.id, author: discordUser.id });
            res.status(204).end();
        } else if (req.method == "POST") {
            const discordUser = await getAuthInfoAPI(req);
            if (!discordUser) return res.status(403).end();
            await Blog.findOneAndUpdate(
                { id: req.query.id, author: discordUser.id },
                {
                    name: req.headers.name,
                    description: decodeURIComponent(req.headers.description),
                    tags: req.headers.tags.split(","),
                    thumbnail: req.headers.thumbnail,
                    content: decodeURIComponent(req.headers.content),
                    updatedAt: new Date()
                }
            );

            res.status(204).end();
        } else res.status(400).json({});
    } else res.status(403).json({});
};
