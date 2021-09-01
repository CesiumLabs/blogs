import moment from "moment";
import axios from "axios";
import mongoose from "mongoose";
import connectMongoose from "../../middleware/mongodb";
import getAuthInfo from "../../middleware/getAuthInfo";
import { Blog } from "../../utils/schemas";
import renderMarkdown from "../../utils/markdown";
import Frame from "../../components/frame";
import { SocialButton } from "../../components/button";
import "highlight.js/styles/agate.css";

export default function BlogPage({ notFound, id, name, description, thumbnail, tags, author, createdAt, updatedAt, content, isAuthor }) {
    if (notFound)
        return (
            <Frame title="404" description={`No blog found with id ${id}!`}>
                <div className="p-4 md:p-10">
                    <div className="bg-theme-100 rounded-lg text-center text-white py-10">
                        <h1 className="font-bold text-8xl md:text-10xl">404</h1>
                        <p className="opacity-75 text-lg -mt-2">
                            There is no blog registered with {id}!
                        </p>
                    </div>
                </div>
            </Frame>
        );

    return (
        <Frame title={name} description={description} image={thumbnail}>
            <div className="p-8 w-full">
                <div className="shadow-2md rounded-lg">
                    <div className="p-6 rounded-t-lg w-full text-white border-1 border-grey-100 border-b-none bg-theme-100">
                        <h1 className="text-8xl font-bold">{name}</h1>
                        <div className="mt-1">
                            {(tags.length ? tags : ["nil"]).map((x, i) => (
                                <a key={i} className={`font-consolas text-white rounded-sm py-1 px-2 bg-teal-600 hover:bg-teal-500 uppercase font-bold ${i == 0 ? "" : "ml-2"}`} href={`/?tag=${encodeURIComponent(x)}`}>
                                    {x}
                                </a>
                            ))}
                        </div>

                        <p className="opacity-80 block mt-2 mb-1 font-changa text-lg">{description}</p>

                        {isAuthor ? (
                            <div className="-ml-1 -mt-1 mb-2">
                                <SocialButton svg="fas fa-trash-alt" color="bg-red-600" onClick={async () => {
                                    try {
                                        await axios.delete(`/api/blog/${id}`);
                                    } catch(e) {
                                        console.log(e);
                                        alert("Failed deleting the blog. Try to check the browser console for the error.")
                                    }
                                    // window.location.href = "/";
                                }}>DELETE</SocialButton>
                            </div>
                        ) : null}

                        {author ? (
                            <div>
                                <img className="w-5 rounded-full inline-block mr-2 -mt-1" src={author.avatar} alt={author.username} />
                                <p className="opacity-80 leading-none inline-block">
                                    <a className="font-bold hover:underline hover:opacity-100" href={`/member/${author.id}`}>
                                        {author.username}
                                    </a>
                                    ・{moment(createdAt).fromNow()}・{getReadTime(content)}
                                </p>
                            </div>
                        ) : null}
                    </div>
                    <div className="p-6 shadow-md rounded-b-lg bg-white w-full border-default border-grey-100">
                        <div className="mt-2" dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }} />
                        <p className="mt-2 text-lg">Last updated {moment(updatedAt).fromNow()}...</p>
                    </div>
                </div>
            </div>
        </Frame>
    );
}

BlogPage.getInitialProps = async (ctx) => {
    await connectMongoose();
    const blog = await Blog.findOne({ id: ctx.query.id });
    if (!blog) return { notFound: true };
    const authInfo = await getAuthInfo(ctx);
    
    return {
        name: blog.name,
        description: blog.description,
        author: mongoose.staffs.get(blog.author),
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
        content: blog.content,
        tags: blog.tags,
        id: blog.id,
        thumbnail: blog.thumbnail,
        isAuthor: blog.author == authInfo?.id
    };
};

function getReadTime(content) {
    const d = moment.duration(content.split(" ").length * 0.2 * 1000);
    const m = Math.round(d.asMinutes());
    if (m == 0) {
        const s = Math.round(d.asSeconds());
        if (s == 0) return "Less than a second read";
        else return `${s} seconds read`;
    } else return `${m} minutes read`;
}
