import { createSimplifiedJSONBlog } from "../../utils";
import { Blog } from "../../utils/schemas";

export default async (req, res) => {
    if (req.method == "GET" && req.headers.host == process.env.HOST) {
        const query = decodeURIComponent(req.query.q);
        res.status(200).json(
            (await Blog.find())
                .filter(({ name }) => query.includes(name) || name.includes(query))
                .slice(0, 20)
                .map(createSimplifiedJSONBlog)
        )
    } else res.status(403).json({});
}