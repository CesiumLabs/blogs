import moment from "moment";

export default function BlogCard({ blog, textColor = "black", bgColor = "white" }) {
    return (
        <div className={`text-${textColor} text-left mt-3 ml-3 font-changa md:max-w-md-card lg:max-w-lg-card w-full shadow-2md`}>
            <div
                className="rounded-b-sm p-3 rounded-default flex flex-col justify-between h-full"
                style={{
                    backgroundImage: `url(${blog.thumbnail})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundBlendMode: "multiply",
                    backgroundColor: "#303045"
                }}
            >
                <div className="ml-3">
                    <div className="-ml-2 pl-2">
                        {(blog.tags.length ? blog.tags : ["nil"]).map((x, i) => (
                            <a className={`text-sm text-blurple-default hover:text-blurple-200 uppercase font-bold ${i == 0 ? "" : "ml-2"}`} href={`/?tag=${encodeURIComponent(x)}`}>
                                {x}
                            </a>
                        ))}
                    </div>

                    <a href={`/blog/${blog.id}`} className="text-2xl mb-3 block font-bold hover:underline break-words leading-none cursor-pointer">
                        {blog.name}
                    </a>
                    <p className="-mt-1 block opacity-75 mb-2">{blog.description}</p>
                </div>

                {blog.author ? (
                    <div className="flex ml-2">
                        <img draggable="false" className="w-6 h-6 rounded-full mr-2 -mt-1" src={blog.author.avatar} alt={blog.author.username} />
                        <p className="opacity-80 leading-none flex">
                            <a className="font-bold hover:underline hover:opacity-full" href={`/member/${blog.author.id}`}>
                                {blog.author.username}
                            </a>
                            ・{moment(blog.createdAt).fromNow()}
                        </p>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
