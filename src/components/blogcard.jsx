import moment from "moment";

export default function BlogCard({ blog, textColor = "black", bgColor = "white" }) {
    // TODO: Kindly remove the below code once development is over...
    blog.thumbnail = "https://snowflakedev.org/images/logo.png";

    return <div className={`text-${textColor} mt-3 ml-3 font-changa md:max-w-md-card lg:max-w-lg-card w-full shadow-2md`}>
        <img draggable="false" className="rounded-default block float-left h-22 w-20 m-3 border-grey-300 border-2" src={blog.thumbnail} alt={blog.name}/>
        <div className={`bg-${bgColor} rounded-b-sm p-3 rounded-default`}>
            <div className="-ml-2 pl-2">
                {(blog.tags.length ? blog.tags : ['nil']).map((x, i) => <a className={`font-consolas text-blurple-default hover:text-blurple-200 uppercase font-bold ${i == 0 ? "" : "ml-2"}`} href={`/?tag=${encodeURIComponent(x)}`}>{x}</a>)}
            </div>

            <a href={`/blog/${blog.id}`} className="text-2xl font-bold hover:underline cursor-pointer">{blog.name}</a>
            <p className="-mt-1 block opacity-50 mb-2">{blog.description}</p>
            {blog.author ? (
                <div className="flex space-x-1">
                    <img draggable="false" className="w-6 h-6 rounded-full mr-2 -mt-1" src={blog.author.avatar} alt={blog.author.username}/>
                    <p className="opacity-80 leading-none flex flex-col">
                        <a className="font-bold hover:underline hover:opacity-100" href={`/member/${blog.author.id}`}>{blog.author.username}</a>
                        <p className="mt-2 text-grey-500">{moment(blog.createdAt).fromNow()}...</p>
                    </p>
                </div>
            ) : null}
        </div>
    </div>
}