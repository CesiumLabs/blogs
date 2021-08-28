import axios from "axios";
import { useEffect } from "react";
import Frame from "../components/frame";
import { SocialButton } from "../components/button";
import connectMongoose from "../middleware/mongodb";
import { getAuthUserInfo } from "../utils";
import { User } from "../utils/schemas";

export default function Me({ redirect, username, avatar, id, rank, bio, twitter, github, website }) {
    useEffect(() => {
        if (redirect) window.location.href = '/api/panel/login';
    }, []);

    return (
        <Frame title={username} description={bio || `The profile of ${username}.`}>
            <div className="p-4 md:p-10">
                <div className="bg-theme-100 rounded-lg" style={{ padding: "1rem" }}>
                    <div className="md:flex flex-wrap">
                        <img className="md:w-300 rounded-full block border-4 border-blurple-default" src={`${avatar}`} draggable="false" alt={username} />
                        <div className="md:mt-4 md:ml-4 text-center md:text-left">
                            <h2 className="text-white font-bold text-5xl">{username}</h2>
                            <p className="opacity-75 text-white block mb-2 -mt-2">{bio || "No description has been set!"}</p>
                            <div className="-ml-2">
                                {true ? <i className="fas fa-tools text-red-500 text-xl ml-2" /> : null}
                                {rank == 2 ? <i className="fas fa-code text-blurple-200 text-xl ml-2" /> : null}
                            </div>
                            <div className="-ml-1 mt-2">
                                <SocialButton href={`/member/${id}/blogs`} svg="fas fa-book" color="bg-orange-500">
                                    BLOGS
                                </SocialButton>
                                {twitter ? (
                                    <SocialButton href={`https://twitter.com/${twitter}`} svg="fab fa-twitter" color="bg-twitter">
                                        TWITTER
                                    </SocialButton>
                                ) : null}
                                {github ? (
                                    <SocialButton href={`https://github.com/${github}`} svg="fab fa-github" color="bg-grey-700">
                                        GITHUB
                                    </SocialButton>
                                ) : null}
                                {website ? (
                                    <SocialButton href={website} svg="far fa-window-restore" color="bg-indigo-500">
                                        WEBSITE
                                    </SocialButton>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Frame>
    );
}

Me.getInitialProps = async (ctx) => {
    const discordUser = await getAuthUserInfo(ctx.req);
    if (!discordUser) return { redirect: true };

    await connectMongoose();
    let user = await User.findOne({ id });
    if (!user) return { redirect: true };

    return {
        ...user.toJSON(),
        ...discordUser
    };
};
