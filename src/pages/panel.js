import Frame from '../components/frame';
import getAuthInfo from '../middleware/getAuthInfo';
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

Panel.getInitialProps = getAuthInfo;