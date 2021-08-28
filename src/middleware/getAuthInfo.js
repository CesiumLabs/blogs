import axios from 'axios';
import cookie from 'cookie';

export default ({ req, res }) => {
    const { auth_id, rank } = cookie.parse(req.headers.cookie || {});
    if (!auth_id) return res.redirect('/api/panel/login');
    
    const { data } = await axios.get('https://backend.snowflakedev.org/api/authorize', { 
        headers: { authorization: `Bearer ${auth_id}` } 
    });

    return { user: data, rank };
}