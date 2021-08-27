import axios from 'axios';
import { getAuthID } from '../utils';
import Frame from '../components/frame';
import connectMongoose from '../middleware/mongodb';

export default function Panel({ forbidden, avatarURL, username }) {
    if (forbidden) return 'You are not allowed to use the panel...';
    
    return <Frame title="Panel" description="Staff panel for admins and developers of the origanization">
        <div className="p-10">
            <div className="bg-theme-100 rounded-lg" style={{ padding: '1rem' }}>
                <div className="md:flex flex-wrap">
                    <img className="w-300 max-w-lg:w-full rounded-lg block" src={avatarURL + '?size=2048'} draggable="false" alt={username}/>
                </div>
            </div>
        </div>
    </Frame>
}

Panel.getInitialProps = async (ctx) => {
    const token = getAuthID(ctx.req);
    if (!token) return ctx.res.redirect('/api/panel/login');
    
    const { data } = await axios.get('https://backend.snowflakedev.org/api/authorize', { 
        headers: { authorization: `Bearer ${token}` } 
    });

    return data.data
}