import moment from "moment";

export default function BlogCard({ blog, textColor = "black", bgColor = "white" }) {
    // Kindly remove the below code once development is over...
    blog.thumbnail = "https://snowflakedev.org/images/logo.png";
    console.log(blog.author)

    return <div className={`text-${textColor} mt-3 ml-3 font-changa md:max-w-md-card lg:max-w-lg-card w-full`}>
        <img className="block rounded-t-sm w-full" src={blog.thumbnail} alt={blog.name}/>
        <div className={`bg-${bgColor} rounded-b-sm p-3`}>
            <div className="-ml-2 pl-2">
                {(blog.tags.length ? blog.tags : ['nil']).map((x, i) => <a className={`font-consolas text-blurple-default uppercase font-bold ${i == 0 ? "" : "ml-2"}`} href={`/?tag=${encodeURIComponent(x)}`}>{x}</a>)}
            </div>

            <a href={`/blog/${blog.id}`} className="text-2xl font-bold hover:underline cursor-pointer">{blog.name}</a>
            <p className="-mt-1 block opacity-50 mb-2">{blog.description}</p>
            {blog.author ? (
                <div>
                    <img className="w-5 rounded-full inline-block mr-2 -mt-1" src={blog.author.avatar} alt={blog.author.username}/>
                    <p className="opacity-80 leading-none inline-block">
                        <a className="font-bold hover:underline hover:opacity-100" href={`/member/${blog.author.id}`}>{blog.author.username}</a> {moment(blog.createdAt).fromNow()}...
                    </p>
                </div>
            ) : null}
        </div>
    </div>
}