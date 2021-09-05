import { Blog } from "../../../../utils/schemas";
import { createSimplifiedJSONBlog } from "../../../../utils";
import connectMongoose from "../../../../middleware/mongodb";

export default async (req, res) => {
    if (req.method == "GET" && req.headers.host == process.env.HOST) {
        await connectMongoose();
        const blogs = await Blog.find({ author: req.query.id });
        return res.status(200).json(blogs.map(createSimplifiedJSONBlog));
    } else res.status(403).json({});
};
