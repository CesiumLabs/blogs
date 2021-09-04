import { useState, useEffect, useRef } from "react";
import axios from "axios";
import connectMongoose from "../middleware/mongodb";
import parseSearch from "../utils/searchParser";
import Frame from "../components/frame";
import BlogCard from "../components/blogcard";

export default function Home({ recents, randoms }) {
    useEffect(async () => {
        const query = new URLSearchParams(window.location.search);
        if (query.has("tag")) {
            const tag = query.get("tag");
            const { data } = await axios.get("/api/search", { params: { tag } });
            setContent(<SearchContent data={data} />);
            searchElement.current.value = `tag:${tag}`;
        }
    }, []);

    const searchElement = useRef(null);
    const [content, setContent] = useState(
        <div className="p-8">
            <h1 className="text-5xl font-bold">Recently Added</h1>
            <div className="md:flex md:flex-wrap -ml-3 w-full">
                {recents.map((x, i) => (
                    <BlogCard key={i} textColor="white" bgColor="theme-200" blog={x} />
                ))}
            </div>

            <h1 className="text-5xl font-bold mt-8">Random Blogs</h1>
            <div className="md:flex md:flex-wrap -ml-3 w-full">
                {randoms.map((x, i) => (
                    <BlogCard key={i} textColor="white" bgColor="theme-200" blog={x} />
                ))}
            </div>
        </div>
    );

    return (
        <Frame>
            <div className="py-8 text-center">
                <h1 className="text-5xl sm:text-8xl md:text-9xl font-changa font-bold">Snowflake Blogs</h1>
                <p className="text-xs sm:text-sm md:text-base opacity-75 leading-none -mt-2">Experience blogs written by the developers of the snowflake organization itself!</p>
                <input
                    className="w-3/4 p-2 rounded-sm inline-block mt-4 outline-none shadow-md"
                    placeholder="Search blogs here..."
                    ref={searchElement}
                    onKeyPress={async (e) => {
                        if (e.key == "Enter") {
                            const parsed = parseSearch(searchElement.current.value);
                            // Try to work on lowercase search later...
                            parsed.q = encodeURIComponent(parsed.q.join(" "));
                            const { data } = await axios.get("/api/search", { params: parsed });
                            setContent(<SearchContent data={data} />);
                        }
                    }}
                />
            </div>

            {content}
        </Frame>
    );
}

Home.getInitialProps = async () => {
    await connectMongoose();
    const { data } = await axios.get(`${process.env.URL}/api/home`);
    return data
};

function SearchContent({ data }) {
    return (
        <div className="py-4 px-8">
            <p className="font-changa text-lg block mb-2">Found {data.length} search results...</p>
            <div className="md:flex md:flex-wrap -ml-3 w-full">
                {data.map((x, i) => (
                    <BlogCard key={i} textColor="white" bgColor="theme-200" blog={x} />
                ))}
            </div>
        </div>
    );
}
