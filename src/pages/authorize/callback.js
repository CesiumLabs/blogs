import { useEffect } from 'react';
import axios from 'axios';
import connectMongoose from '../../middleware/mongodb';

export default function Callback({ redirect }) {
    useEffect(() => {
        if (redirect) window.location.href = '/';
    });

    return [];
}

Callback.getInitialProps = async (ctx) => {
    if (!ctx.query.code) return { redirect: true };
    
    const { data } = await axios.get('https://backend.snowflakedev.cf/api/authorize?code=' + ctx.query.code, {
        headers: {
            redirect_uri: encodeURIComponent(`${process.env.ORIGIN}/authorize/callback`)
        }
    });

    console.log(data);
    return {};
}