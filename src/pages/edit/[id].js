import axios from "axios";
import connectMongoose from "../../middleware/mongodb";
import getAuthInfo from "../../middleware/getAuthInfo";
import { Blog } from "../../utils/schemas";
import Frame from "../../components/frame";

export default function Edit({ notFound, id }) {
    if (notFound)
        return (
            <Frame>
                <div className="p-4 md:p-10">
                    <div className="bg-theme-100 rounded-lg text-center text-white py-10">
                        <h1 className="font-bold text-8xl md:text-10xl">404</h1>
                        <p className="opacity-75 text-lg -mt-2">
                            There is no blog which is written by you registered with {id}!
                        </p>
                    </div>
                </div>
            </Frame>
        );

    return null
}

Edit.getInitialProps = async (ctx) => {
    await connectMongoose();
    const blog = await Blog.findOne({ id: ctx.query.id });
    if (!blog) return { notFound: true };
    const authInfo = await getAuthInfo(ctx);
    if (blog.author != authInfo?.id) return { notFound: true };
    
    return {
        name: blog.name,
        description: blog.description,
        content: blog.content,
        tags: blog.tags,
        thumbnail: blog.thumbnail
    };
};