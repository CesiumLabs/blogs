import axios from "axios";
import { useEffect, useState } from "react";
import Frame from "../components/frame";
import BlogCard from "../components/blogcard";
import { SocialButton } from "../components/button";
import connectMongoose from "../middleware/mongodb";
import getAuthInfo from "../middleware/getAuthInfo";
import { User } from "../utils/schemas";

export default function Me({ redirect, username, avatarURL, id, rank, bio, twitter, github, website, banner }) {
    if (redirect) {
        useEffect(() => window.location.href = '/api/panel/login', []);
        return null;
    }

    const [state, setState] = useState({ bio, twitter, github, website, banner, openEdit: false, blogs: null });

    useEffect(() => {
        if (state.openEdit) {
            document.getElementById('bio_input').value = state.bio || '';
            document.getElementById('twitter_input').value = state.twitter || '';
            document.getElementById('gh_input').value = state.github || '';
            document.getElementById('website_input').value = state.website || '';
            document.getElementById('banner_input').value = state.banner || '';
        }
    }, [state.openEdit]);

    return (
        <Frame title={username} description={state.bio || `The profile of ${username}.`}>
            <div className="p-4 md:p-10">
                <div className="shadow-2md rounded-lg p-4 md:p-8" style={{
                    backgroundImage: state.banner ? `url(${state.banner})` : null,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundBlendMode: 'multiply',
                    backgroundColor: '#303045',
                    backgroundAttachment: 'fixed'
                }}>
                    <div className="md:flex md:flex-nowrap">
                        <img className="md:w-300 md:h-300 rounded-full block border-4 border-blurple-default shadow-2md" src={`${avatarURL}?size=2048`} draggable="false" alt={username} />
                        <div className="md:mt-4 md:ml-4 text-center md:text-left w-full">
                            <h2 className="text-white font-bold text-5xl">{username}</h2>
                            <p className="opacity-75 text-white block mb-2 -mt-2">{state.bio || "No description has been set!"}</p>
                            <div className="-ml-2">
                                {[1, 3].includes(rank) ? <i className="fas fa-tools text-red-500 text-xl ml-2" /> : null}
                                {rank == 2 ? <i className="fas fa-code text-blurple-200 text-xl ml-2" /> : null}
                            </div>
                            <div className="-ml-1 mt-2">
                                <SocialButton onClick={() => setState({ ...state, openEdit: !state.openEdit })} svg="fa fa-edit" color="bg-red-500">EDIT</SocialButton>
                                {state.twitter ? (
                                    <SocialButton href={`https://twitter.com/${state.twitter}`} svg="fab fa-twitter" color="bg-twitter">
                                        TWITTER
                                    </SocialButton>
                                ) : null}
                                {state.github ? (
                                    <SocialButton href={`https://github.com/${state.github}`} svg="fab fa-github" color="bg-grey-700">
                                        GITHUB
                                    </SocialButton>
                                ) : null}
                                {state.website ? (
                                    <SocialButton href={state.website} svg="far fa-window-restore" color="bg-indigo-500">
                                        WEBSITE
                                    </SocialButton>
                                ) : null}
                                <SocialButton href="/new" svg="fas fa-plus" color="bg-teal-500">NEW</SocialButton>
                            </div>

                            {state.openEdit ? (
                                <div className="mt-3 mb-2">
                                    <h2 className="text-white text-xl md:text-lg font-bold -mb-1">Edit Profile</h2>
                                    <EditInput name="Bio" id="bio_input" placeholder="Your profile bio here..."/>
                                    <EditInput name="Twitter" id="twitter_input" placeholder="Your twitter username here..."/>
                                    <EditInput name="Github" id="gh_input" placeholder="Your github username here..."/>
                                    <EditInput name="Website" id="website_input" placeholder="Your website url here..."/>
                                    <EditInput name="Banner" id="banner_input" placeholder="Your profile banner url here..."/>

                                    <a onClick={async () => {
                                        const newProfileData = {
                                            bio: document.getElementById('bio_input').value,
                                            twitter: document.getElementById('twitter_input').value,
                                            github: document.getElementById('gh_input').value,
                                            website: document.getElementById('website_input').value,
                                            banner: document.getElementById('banner_input').value
                                        };

                                        try {
                                            await axios({ method: 'POST', url: `/api/member/edit`, headers: newProfileData });
                                        } catch (e) {
                                            console.log(e);
                                            alert("Failed updating profile. Try to check browser console for error.");
                                        }
                                        
                                        setState({ ...state, ...newProfileData, openEdit: false });
                                    }} className="mt-2 cursor-pointer block rounded-sm text-white px-2 py-1 bg-red-500 w-full md:w-1/4 text-center">Edit</a>
                                </div>
                            ) : null}
                        </div>
                    </div>

                    <div className="mt-5 p-2">
                        <h1 className="text-5xl text-white font-bold mb-1">Your Blogs</h1>

                        {state.blogs ? (
                            state.blogs.length ? (
                                <div className="md:flex md:flex-wrap -ml-3 w-full">
                                    {state.blogs.sort((a, b) => b.updatedAt - a.updatedAt).map(x => <BlogCard textColor="white" bgColor="theme-200" blog={x}/>)}
                                </div>
                            ) : <p className="text-white opacity-75 mt-1 block">Seems like you have not created even one blog...</p>
                        ) : <div className="-ml-1">
                            <SocialButton svg="shadow-2md fas fa-book" color="bg-orange-500" onClick={async () => {
                                const { data } = await axios.get(`/api/member/${id}/blogs`);
                                setState({ ...state, blogs: data });
                            }}>View your blogs</SocialButton>
                        </div>}
                    </div>
                </div>
            </div>
        </Frame>
    );
}

Me.getInitialProps = async (ctx) => {
    const discordUser = await getAuthInfo(ctx);
    if (!discordUser) return { redirect: true };

    await connectMongoose();
    let user = await User.findOne({ id: discordUser.id });
    if (!user) return { redirect: true };

    return {
        ...discordUser,
        ...user.toJSON()
    };
};

function EditInput({ name, id, placeholder }) {
    return <>
        <h3 className="text-white text-md font-bold mt-2">{name}</h3>
        <input className="outline-none w-full px-2 py-1 border-none rounded-sm" id={id} placeholder={placeholder}/>
    </>
}