import axios from "axios";
import { useEffect, useState } from "react";
import Frame from "../components/frame";
import BlogCard from "../components/blogcard";
import { SocialButton } from "../components/button";

export default function Me() {
    const [state, setState] = useState({ loaded: false, caughtError: false, openEdit: false });
    const [blogs, setBlogs] = useState(null);

    useEffect(async () => {
        // This part of code is only for development purposes and is better to keep while production too..
        if (state.caughtError) return;

        try {
            const { data } = await axios.get("/api/me");
            setState({ ...state, ...data, loaded: true });
        } catch (e) {
            if (e.response) {
                if (e.response.status == 404) window.location.href = "/api/panel/login";
                else {
                    console.log(e);
                    setState({ ...state, caughtError: true });
                    alert("Looks like the server has encountered an error. Try to report the error logged in the browser console!");
                }
            }

            window.location.href = "/api/panel/login";
        }
    }, []);

    useEffect(() => {
        if (state.openEdit && state.loaded) {
            document.getElementById("bio_input").value = state.bio || "";
            document.getElementById("twitter_input").value = state.twitter || "";
            document.getElementById("gh_input").value = state.github || "";
            document.getElementById("website_input").value = state.website || "";
            document.getElementById("banner_input").value = state.banner || "";
        }
    }, [state.openEdit]);

    return (
        <Frame title={state.username} description={state.bio || `The profile of ${state.username}.`}>
            <div
                style={{
                    backgroundImage: state.banner ? `url(${state.banner})` : null,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundBlendMode: "multiply",
                    backgroundColor: "#303045",
                    backgroundPosition: "center",
                    height: "40vh",
                    width: "100%"
                }}
            />

            <div className="p-4 md:p-10">
                <div
                    className="-mb-4"
                    style={{
                        marginTop: "-30vh"
                    }}
                >
                    <div className="text-center md:text-left md:flex md:flex-nowrap md:content-evely">
                        <img className="md:w-300 md:h-300 rounded-lg inline-block border-default border-grey-100 shadow-2md" src={state.avatarURL + "?size=2048"} draggable="false" alt={state.username} />
                        <div className="w-full mt-5 md:ml-4 md:mt-1 rounded-lg shadow-2md p-4 md:p-8 border-default border-grey-100 w-full bg-white">
                            <h2 className="font-bold text-5xl">{state.username}</h2>
                            <p className="opacity-75 block mb-2 -mt-2">{state.bio || "No description has been set!"}</p>
                            <div className="-ml-2">
                                {[1, 3].includes(state.rank) ? <i className="fas fa-tools text-red-500 text-xl ml-2" /> : null}
                                {state.rank == 2 ? <i className="fas fa-code text-blurple-200 text-xl ml-2" /> : null}
                            </div>
                            <div className="-ml-1 mt-2">
                                <SocialButton onClick={() => setState({ ...state, openEdit: !state.openEdit })} svg="fa fa-edit" color="bg-red-500">
                                    EDIT
                                </SocialButton>
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
                            </div>

                            {state.openEdit ? (
                                <div className="mt-5 mb-2 text-left">
                                    <h2 className="text-5xl font-bold">Edit Profile</h2>
                                    <EditInput name="Bio" id="bio_input" placeholder="Your profile bio here..." />
                                    <EditInput name="Twitter" id="twitter_input" placeholder="Your twitter username here..." />
                                    <EditInput name="Github" id="gh_input" placeholder="Your github username here..." />
                                    <EditInput name="Website" id="website_input" placeholder="Your website url here..." />
                                    <EditInput name="Banner" id="banner_input" placeholder="Your profile banner url here..." />

                                    <a
                                        onClick={async () => {
                                            const newProfileData = {
                                                bio: document.getElementById("bio_input").value,
                                                twitter: document.getElementById("twitter_input").value,
                                                github: document.getElementById("gh_input").value,
                                                website: document.getElementById("website_input").value,
                                                banner: document.getElementById("banner_input").value
                                            };

                                            try {
                                                await axios({ method: "POST", url: `/api/member/edit`, headers: newProfileData });
                                            } catch (e) {
                                                console.log(e);
                                                alert("Failed updating profile. Try to check browser console for error.");
                                            }

                                            setState({ ...state, ...newProfileData, openEdit: false });
                                        }}
                                        className="mt-2 cursor-pointer block rounded-sm text-white px-2 py-1 bg-red-600 w-full md:w-1/4 text-center"
                                    >
                                        Edit
                                    </a>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>

                <div className="mt-5 p-2">
                    {blogs ? (
                        blogs.length ? (
                            <div>
                                <h1 className="text-5xl font-bold mb-1 mt-2">Blogs</h1>
                                <div className="md:flex md:flex-wrap -ml-3 w-full">
                                    {blogs
                                        .sort((a, b) => b.updatedAt - a.updatedAt)
                                        .map((x, i) => (
                                            <BlogCard key={i} textColor="white" bgColor="theme-200" blog={x} />
                                        ))}
                                </div>
                            </div>
                        ) : (
                            <p className="opacity-75 mt-1 block">Seems like you have not created even one blog...</p>
                        )
                    ) : (
                        <div className="-ml-1">
                            <a
                                className="font-changa hover:underline cursor-pointer text-lg"
                                onClick={async () => {
                                    const { data } = await axios.get(`/api/member/${state.id}/blogs`);
                                    setBlogs(data);
                                }}
                            >
                                View your blogs?
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </Frame>
    );
}

function EditInput({ name, id, placeholder }) {
    return (
        <>
            <h3 className="text-md font-bold mt-2">{name}</h3>
            <input className="w-full px-2 py-1 border-default border-black outline-none rounded-sm" id={id} placeholder={placeholder} />
        </>
    );
}
