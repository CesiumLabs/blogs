import axios from 'axios';
import { getAuthID } from '../utils';
import connectMongoose from '../middleware/mongodb';

export default function Panel({ forbidden }) {
    if (forbidden) return 'You are not allowed to use the panel...';
    
    return <></>
}

Panel.getInitialProps = async (ctx) => {
    const token = getAuthID(ctx.req);
    if (!token) return ctx.res.redirect('/api/panel/login');
    
    const { data } = await axios.get('https://backend.snowflakedev.org/api/authorize', { 
        headers: { authorization: `Bearer ${token}` } 
    });

    console.log(data);

    return {}
}