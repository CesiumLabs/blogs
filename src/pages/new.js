import { useEffect } from "react";
import axios from "axios";
import Frame from "../components/frame";
import Input from "../components/input";
import { getAuthID } from '../utils';

export default function New({ redirect }) {
    if (redirect) {
        useEffect(() => window.location.href = '/api/panel/login');
        return null;
    }

    return (
        <Frame title="New" description="Add new blog.">
            <div className="p-4 md:p-10">
                <div className="rounded-lg p-8 bg-white shadow-2md border-default border-grey-100">
                    <h1 className="text-black text-5xl font-bold">New Blog</h1>
                    <p className="opacity-75 text-black">Remember to make your blog perfect, attractive and useful!</p>

                    <table className="text-black w-full mt-3">
                        <Input name="Name" description="The name of the blog. Required." placeholder="Awesome blog." id="name_input"/>
                        <Input name="Description" description="The short description of your blog. Required." placeholder="My awesome blog." id="dsc_input"/>
                        <Input name="Tags" description="The tags for the blog. Maximum 5 tags. Seperated by comma." placeholder="tech, javascript, web" id="tags_input"/>
                        <Input name="Thumbnail" description="The thumbnail url of the flag. Required." placeholder="https://example.com/image.png" id="thumbnail_input"/>
                    </table>

                    <p className="text-xl font-bold text-black">Content</p>
                    <p className="opacity-75 mb-3 text-black">The main content part of the blog...</p>
                    <textarea className="mt-1 rounded-sm p-2 outline-none resize-y w-full min-h-300 shadow-md border-default border-grey-100" id="content_input" placeholder="Your markdown content here..."/>

                    <a className="rounded-sm px-2 py-1 bg-teal-600 hover:bg-teal-500 mt-3 block text-center text-white cursor-pointer uppercase font-bold" onClick={async () => {
                        const blog = {
                            name: document.getElementById('name_input').value,
                            description: document.getElementById('dsc_input').value,
                            tags: document.getElementById('tags_input').value.split(', '),
                            thumbnail: document.getElementById('thumbnail_input').value,
                            content: encodeURIComponent(document.getElementById('content_input').value)
                        };

                        if (!blog.name) return alert("No name has been provided.");
                        if (blog.description.length < 10) return alert("Description for the blog is way too short.");
                        if (blog.tags.length > 5) return alert("You have provided more than 5 tags.");
                        if (!blog.thumbnail) return alert("No thumbnail has been provided for the thumbnail.");
                        if (!blog.content) return alert("No content has been provided.");

                        try {
                            const { data } = await axios('/api/blog/new', { method: 'PUT', headers: blog });
                            window.location.href = `/blog/${data.id}`;
                        } catch (e) {
                            console.log(e);
                            alert("Failed creating new blog. Check the browser console for error.")
                        }
                    }}>Submit</a>
                </div>
            </div>
        </Frame>
    );
}

New.getInitialProps = async (ctx) => {
    if (!getAuthID(ctx.req)) return { redirect: true };
    return { success: true };
}