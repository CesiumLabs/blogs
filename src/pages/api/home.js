import { createSimplifiedJSONBlog } from "../../utils";
import { Blog } from "../../utils/schemas";

let cached;

export default async (req, res) => {
    if (req.method == "GET") {
        if (cached && (Date.now() - cached.createdAt) > 300000) res.status(200).json(cacged)
        const blogs = (await Blog.find()).map(createSimplifiedJSONBlog);
        cached = {
            createdAt: Date.now(),
            recents: blogs.sort((a, b) => b.updatedAt - a.updatedAt),
            randoms: shuffle(blogs)
        }

        res.status(200).json(cached);
    } else res.status(403).json({});
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
  
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    
    return array;
}