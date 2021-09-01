import { useEffect } from "react";
import axios from "axios";
import connectMongoose from "../../middleware/mongodb";
import getAuthInfo from "../../middleware/getAuthInfo";
import { Blog } from "../../utils/schemas";
import Frame from "../../components/frame";
import Input from "../../components/input";

export default function Edit({ notFound, id, name, description, tags = [], thumbnail, content }) {
    useEffect(() => {
        document.getElementById("name_input").value = name;
        document.getElementById("dsc_input").value = description;
        document.getElementById("thumbnail_input").value = thumbnail;
        document.getElementById("tags_input").value = tags.join(", ");
        document.getElementById("content_input").value = content;
    }, []);

    if (notFound)
        return (
            <Frame>
                <div className="p-4 md:p-10">
                    <div className="bg-theme-100 rounded-lg text-center text-white py-10">
                        <h1 className="font-bold text-8xl md:text-10xl">404</h1>
                        <p className="opacity-75 text-lg -mt-2">There is no blog which is written by you registered with {id}!</p>
                    </div>
                </div>
            </Frame>
        );

    return (
        <Frame>
            <div className="p-4 md:p-10">
                <div className="shadow-2md rounded-lg">
                    <div className="rounded-t-lg p-8 bg-theme-100 border-default border-grey-100">
                        <h1 className="text-white text-5xl font-bold">Edit Blog</h1>
                        <p className="opacity-75 text-white">Looks like you have to make changes in your blog!</p>
                    </div>

                    <div className="rounded-b-lg p-8 bg-white border-default border-t-none border-grey-100">
                        <table className="text-black w-full mt-3">
                            <Input name="Name" description="The name of the blog. Required." placeholder="Awesome blog." id="name_input" />
                            <Input name="Description" description="The short description of your blog. Required." placeholder="My awesome blog." id="dsc_input" />
                            <Input name="Tags" description="The tags for the blog. Maximum 5 tags. Seperated by comma." placeholder="tech, javascript, web" id="tags_input" />
                            <Input name="Thumbnail" description="The thumbnail url of the flag. Required." placeholder="https://example.com/image.png" id="thumbnail_input" />
                        </table>

                        <p className="text-xl font-bold text-black">Content</p>
                        <p className="opacity-75 mb-3 text-black">The main content part of the blog...</p>
                        <textarea className="mt-1 rounded-sm p-2 outline-none resize-y w-full min-h-300 shadow-2md border-default border-grey-100" id="content_input" placeholder="Your markdown content here..." />

                        <a
                            className="rounded-sm px-2 py-1 bg-theme-100 mt-3 block text-center text-white cursor-pointer uppercase font-bold shadow-2md"
                            onClick={async () => {
                                const blog = {
                                    name: document.getElementById("name_input").value,
                                    description: document.getElementById("dsc_input").value,
                                    tags: document.getElementById("tags_input").value.split(", "),
                                    thumbnail: document.getElementById("thumbnail_input").value,
                                    content: encodeURIComponent(document.getElementById("content_input").value)
                                };

                                if (!blog.name) return alert("No name has been provided.");
                                if (blog.description.length < 10) return alert("Description for the blog is way too short.");
                                if (blog.tags.length > 5) return alert("You have provided more than 5 tags.");
                                if (!blog.thumbnail) return alert("No thumbnail has been provided for the thumbnail.");
                                if (!blog.content) return alert("No content has been provided.");

                                try {
                                    blog.description = encodeURIComponent(blog.description);
                                    const { data } = await axios(`/api/blog/${id}`, { method: "POST", headers: blog });
                                    window.location.href = `/blog/${id}`;
                                } catch (e) {
                                    console.log(e);
                                    alert("Failed updating the blog. Check the browser console for error.");
                                }
                            }}
                        >
                            Edit
                        </a>
                    </div>
                </div>
            </div>
        </Frame>
    );
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
        thumbnail: blog.thumbnail,
        id: ctx.query.id
    };
};
