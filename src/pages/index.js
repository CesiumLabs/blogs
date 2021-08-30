import axios from "axios";
import connectMongoose from "../middleware/mongodb";
import Frame from "../components/frame";
import BlogCard from "../components/blogcard";

export default function Home({ recents, randoms }) {
    return <Frame>
        <div className="py-8 text-center">
            <h1 className="text-5xl sm:text-8xl md:text-9xl font-changa font-bold">Snowflake Blogs</h1>
            <p className="text-xs sm:text-sm md:text-base opacity-75 leading-none -mt-2">Experience blogs written by the developers of the snowflake organization itself!</p>
            <input className="w-3/4 p-2 rounded-sm inline-block mt-4 outline-none shadow-md" placeholder="Search blogs here..."/>
        </div>

        <div className="p-8">
            <h1 className="text-5xl font-bold">Recently Added</h1>
            <div className="md:flex md:flex-wrap -ml-3 w-full">
                {recents.sort((a, b) => b.updatedAt - a.updatedAt).map(x => <BlogCard textColor="white" bgColor="theme-200" blog={x}/>)}
            </div>

            <h1 className="text-5xl font-bold mt-8">Random</h1>
            <div className="md:flex md:flex-wrap -ml-3 w-full">
                {randoms.sort((a, b) => b.updatedAt - a.updatedAt).map(x => <BlogCard textColor="white" bgColor="theme-200" blog={x}/>)}
            </div>
        </div>
    </Frame>
}

Home.getInitialProps = async (ctx) => {
    await connectMongoose();
    const { data } = await axios.get(`${process.env.URL}/api/home`);
    return data;
}