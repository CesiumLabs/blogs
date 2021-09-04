import { createSimplifiedJSONBlog } from "../../utils";
import { Blog } from "../../utils/schemas";
import connectMongoose from "../../middleware/mongodb";

export default async (req, res) => {
    if (req.method == "GET" && req.headers.host == process.env.HOST) {
        await connectMongoose();

        const query = decodeURIComponent(req.query.q);
        let blogs = await Blog.find();

        if (req.query.tag) blogs = blogs.filter((x) => x.tags.includes(req.query.tag));
        else blogs = blogs.filter(({ name }) => query.includes(name) || name.includes(query));

        res.status(200).json(blogs.slice(0, 20).map(createSimplifiedJSONBlog));
    } else res.status(403).json({});
};
