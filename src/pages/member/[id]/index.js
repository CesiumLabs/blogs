import mongoose from "mongoose";
import { useState } from "react";
import axios from "axios";
import Frame from "../../../components/frame";
import BlogCard from "../../../components/blogcard";
import { SocialButton } from "../../../components/button";
import connectMongoose from "../../../middleware/mongodb";
import { User } from "../../../utils/schemas";

export default function Member({ notFound, username, avatar, id, rank, bio, twitter, github, website, banner }) {
    const [blogs, setBlogs] = useState(null);

    if (notFound)
        return (
            <Frame title="404" description={`No staff found with id ${id}!`}>
                <div className="p-4 md:p-10">
                    <div className="bg-theme-100 rounded-lg text-center text-white py-10">
                        <h1 className="font-bold text-8xl md:text-10xl">404</h1>
                        <p className="opacity-75 text-lg -mt-2">
                            User {id} {notFound}
                        </p>
                    </div>
                </div>
            </Frame>
        );

    return (
        <Frame title={username} description={bio || `The profile of ${username}.`}>
            <div className="p-4 md:p-10">
                <div
                    className="shadow-2md rounded-lg p-4 md:p-8"
                    style={{
                        backgroundImage: banner ? `url(${banner})` : null,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundBlendMode: "multiply",
                        backgroundColor: "#303045",
                        backgroundAttachment: "fixed"
                    }}
                >
                    <div className="text-center">
                        <img className="md:w-300 md:h-300 rounded-full inline-block border-4 border-blurple-default shadow-2md" src={avatar} draggable="false" alt={username} />
                        <div className="md:mt-4 w-full">
                            <h2 className="text-white font-bold text-5xl">{username}</h2>
                            <p className="opacity-75 text-white block mb-2 -mt-2">{bio || "No description has been set!"}</p>
                            <div className="-ml-2">
                                {[1, 3].includes(rank) ? <i className="fas fa-tools text-red-500 text-xl ml-2" /> : null}
                                {rank == 2 ? <i className="fas fa-code text-blurple-200 text-xl ml-2" /> : null}
                            </div>
                            <div className="-ml-1 mt-2">
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

                    <div className="mt-5 p-2">
                        {blogs ? (
                            blogs.length ? (
                                <div>
                                    <h1 className="text-5xl text-white font-bold mb-1">{username}'s Blogs</h1>
                                    <div className="md:flex md:flex-wrap -ml-3 w-full">
                                        {blogs
                                            .sort((a, b) => b.updatedAt - a.updatedAt)
                                            .map((x) => (
                                                <BlogCard textColor="white" bgColor="theme-200" blog={x} />
                                            ))}
                                    </div>
                                </div>
                            ) : (
                                <p className="text-white opacity-75 mt-1 block">Seems like {username} has not created even one blog...</p>
                            )
                        ) : (
                            <div className="-ml-1">
                                <a
                                    className="font-changa text-white hover:underline cursor-pointer text-lg"
                                    onClick={async () => {
                                        const { data } = await axios.get(`/api/member/${id}/blogs`);
                                        setBlogs(data);
                                    }}
                                >
                                    View {username}'s blogs?
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Frame>
    );
}

Member.getInitialProps = async (ctx) => {
    await connectMongoose();
    const staff = mongoose.staffs.get(ctx.query.id);
    if (!staff) return { notFound: "is not a staff!", id: ctx.query.id };

    let user = await User.findOne({ id: ctx.query.id });
    if (!user) return { notFound: "has never accessed the site to show the profile!", id: ctx.query.id };

    return {
        ...staff,
        ...user.toJSON()
    };
};
