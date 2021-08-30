import { createSimplifiedJSONBlog } from "../../utils";
import { Blog } from "../../utils/schemas";

export default async (req, res) => {
    if (req.method == "GET") {
        const query = deocodeURIComponent(req.query.q);
        res.status(200).json(
            (await Blog.find())
                .filter(x => query.includes(x) || x.includes(query))
                .map(createSimplifiedJSONBlog)
        )
    } else res.status(403).json({});
}