import Frame from "../components/frame";
import { getAuthID } from '../utils';

export default function New() {
    return (
        <Frame title="New" description="Add new blog.">
            <div className="p-4 md:p-10">
                <div className="bg-theme-100 rounded-lg p-8"></div>
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