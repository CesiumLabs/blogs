import axios from 'axios';
import { useEffect } from 'react';
import Frame from '../../../components/frame';
import connectMongoose from '../../../middleware/mongodb';
import { User } from '../../../utils/schemas';

export default function Member({ 
    notFound,
    username, 
    avatar,
    id,
    admin,
    dev,
    bio,
    twitter,
    github,
    website
}) {
    //useEffect(() => (document.body || document.documentElement).style.backgroundColor = '#253347');
    
    if (notFound) return <Frame title="404" description={`No staff found with id ${id}!`}>
        No staff found...
    </Frame>
    
    return <Frame title={username} description={bio || `The profile of ${username}.`}>
        <div className="p-4 md:p-10">
            <div className="bg-theme-100 rounded-lg" style={{ padding: '1rem' }}>
                <div className="md:flex flex-wrap">
                    <img className="md:w-300 rounded-xl block" src={`${avatar}`} draggable="false" alt={username}/>
                    <div className="md:mt-4 md:ml-4">
                        <h2 className="text-white font-bold text-5xl">{username}</h2>
                        <p className="opacity-75 text-white block mb-2 -mt-2">{bio || 'No description has been set!'}</p>
                        <div className="-ml-1">
                            {true ? <span className="bg-red-700 text-white font-bold py-1 px-2 rounded-sm ml-1 mt-1">ADMIN</span> : null}
                            {dev ? <span className="bg-blurple-200 text-white font-bold py-1 px-2 rounded-sm ml-1 mt-1">DEVELOPER</span> : null}
                        </div>
                        <div className="-ml-1">
                            <a href={`/member/${id}/blogs`} className="ml-1 mt-4 inline-block text-white rounded-default px-4 py-2 bg-orange-500 font-bold cursor-pointer">
                                <i className="fas fa-book"/> BLOGS
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Frame>
}

Member.getInitialProps = async (ctx) => {
    const { data: staffs } = await axios.get('https://api.snowflakedev.org/api/d/staffs');
    const staff = staffs.data.find(x => x.id === ctx.query.id);
    if (!staff) return { notFound: true, id: ctx.query.id };

    await connectMongoose();
    let user = await User.findOne({ id: ctx.query.id });
    if (!user) return { notFound: true, id: ctx.query.id };

    return { ...staff, ...user }
}