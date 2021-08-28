import axios from 'axios';

export default ({ req, res }) => {
    const token = getAuthID(req);
    if (!token) return res.redirect('/api/panel/login');
    
    const { data } = await axios.get('https://backend.snowflakedev.org/api/authorize', { 
        headers: { authorization: `Bearer ${token}` } 
    });

    return data.data;
}