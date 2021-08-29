import Frame from "../components/frame";
import Input from "../components/input";
import { getAuthID } from '../utils';

export default function New() {
    return (
        <Frame title="New" description="Add new blog.">
            <div className="p-4 md:p-10">
                <div className="bg-theme-100 rounded-lg p-8">
                    <h1 className="text-white text-5xl font-bold">New Blog</h1>
                    <p className="opacity-75 text-white">Remember to make your blog perfect, attractive and useful!</p>

                    <table className="text-white w-full mt-2">
                        <Input name="Name" description="The name of the blog. Required." placeholder="Awesome blog." id="name_input"/>
                        <Input name="Description" description="The short description of your blog. Required." placeholder="My awesome blog." id="dsc_input"/>
                        <Input name="Tags" description="The tags for the blog. Maximum 5 tags. Seperated by comma." placeholder="tech, javascript, web" id="tags_input"/>
                        <Input name="Thumbnail" description="The thumbnail url of the flag. Required." placeholder="https://example.com/image.png" id="thumbnail_input"/>
                    </table>
                </div>
            </div>
        </Frame>
    );
}

New.getInitialProps = async (ctx) => {
    if (!getAuthID(ctx.req)) {
        ctx.res.writeHead(302, { Location: '/api/panel/login' });
        return {};
    }

    return { success: true };
}