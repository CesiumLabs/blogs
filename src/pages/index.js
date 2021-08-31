import { useState, useRef } from "react";
import axios from "axios";
import connectMongoose from "../middleware/mongodb";
import parseSearch from "../utils/searchParser";
import Frame from "../components/frame";
import BlogCard from "../components/blogcard";

export default function Home({ recents, randoms }) {
    const searchElement = useRef(null);
    const [content, setContent] = useState(
        <div className="p-8">
            <h1 className="text-5xl font-bold">Recently Added</h1>
            <div className="md:flex md:flex-wrap -ml-3 w-full">
                {recents.map(x => <BlogCard textColor="white" bgColor="theme-200" blog={x}/>)}
            </div>

            <h1 className="text-5xl font-bold mt-8">Random</h1>
            <div className="md:flex md:flex-wrap -ml-3 w-full">
                {randoms.map(x => <BlogCard textColor="white" bgColor="theme-200" blog={x}/>)}
            </div>
        </div>
    );

    return <Frame>
        <div className="min-h-screen">
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
                            parsed.q = encodeURIComponent(parsed.q.join(' '));
                            const { data } = await axios.get("/api/search", { params: parsed });
                            setContent(<SearchContent data={data}/>);
                        }
                    }}
                />
            </div>

            {content}
        </div>

        <div className="text-full text-white bg-theme-100 w-full font-changa text-center text-lg py-4 mt-4">
            <p>Snowflake Development © 2021</p>
        </div>
    </Frame>
}

Home.getInitialProps = async () => {
    await connectMongoose();
    const { data } = await axios.get(`${process.env.URL}/api/home`);
    return data;
}

function SearchContent({ data }) {
    return <div className="py-4 px-8">
        <p className="font-changa text-lg block mb-2">Found {data.length} search results...</p>
        <div className="md:flex md:flex-wrap -ml-3 w-full">
            {data.map(x => <BlogCard textColor="white" bgColor="theme-200" blog={x}/>)}
        </div>
    </div>
}