import { useEffect } from 'react';
import Frame from '../components/frame';
import getAuthInfo from '../middleware/getAuthInfo';
import connectMongoose from '../middleware/mongodb';
import Blog from '../utils/schemas';

const BADGES = [null, { name: 'ADMIN', color: 'bg-red-800' }, { name: 'DEVELOPER', color: 'bg-blurple' }];

export default function Panel({ forbidden, user, rank, articles }) {
    if (forbidden) return 'You are not allowed to use the panel...';

    const badge = BADGES[rank];
    useEffect(() => {
        (document.body || document.documentElement).style.backgroundColor = '#253347';
    });
    
    return <Frame title="Panel" description="Staff panel for admins and developers of the origanization">
        <div className="p-4 md:p-10">
            <div className="bg-theme-100 rounded-lg" style={{ padding: '1rem' }}>
                <div className="md:flex flex-wrap">
                    <img className="md:w-300 rounded-xl block" src={user.avatarURL + '?size=1024'} draggable="false" alt={user.username}/>
                    <div className="md:mt-4 md:ml-4">
                        <h2 className="text-white font-bold text-5xl">{user.username}<span className="opacity-75">#{user.discriminator}</span></h2>
                        <div className="-mt-2 mb-2">
                            <span className="opacity-75 text-white">{articles.length} Articles</span>
                        </div>

                        {badge ? <span className={`${badge.color} text-white font-bold py-1 px-2 rounded-sm`}>{badge.name}</span> : null}
                    </div>
                </div>
            </div>
        </div>
    </Frame>
}

Panel.getInitialProps = async (ctx) => {
    const authInfo = await getAuthInfo(ctx);
    await connectMongoose();

    return { 
        articles: await Blog.find({ author: authInfo.id }),
        ...authInfo
    }
}