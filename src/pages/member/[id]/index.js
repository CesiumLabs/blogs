import axios from "axios";
import Frame from "../../../components/frame";
import { SocialButton } from "../../../components/button";
import connectMongoose from "../../../middleware/mongodb";
import { User } from "../../../utils/schemas";

export default function Member({ notFound, username, avatar, id, rank, bio, twitter, github, website }) {
    if (notFound)
        return (
            <Frame title="404" description={`No staff found with id ${id}!`}>
                <div className="p-4 md:p-10">
                    <div className="bg-theme-100 rounded-lg text-center text-white py-10">
                        <h1 className="font-bold text-8xl md:text-10xl">404</h1>
                        <p className="opacity-75 text-lg -mt-2">User {id} {notFound}</p>
                    </div>
                </div>
            </Frame>
        );

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

Member.getInitialProps = async (ctx) => {
    const { data: staffs } = await axios.get("https://api.snowflakedev.org/api/d/staffs");
    const staff = staffs.data.find((x) => x.id === ctx.query.id);
    if (!staff) return { notFound: "is not a staff!", id: ctx.query.id };

    await connectMongoose();
    let user = await User.findOne({ id: ctx.query.id });
    if (!user) return { notFound: "has never accessed the site to show the profile!", id: ctx.query.id };

    return {
        ...user.toJSON(),
        ...staff
    };
};
