import cookie from 'cookie';

export default (req, res) => {
    res.setHeader('Set-Cookie', [cookie.serialize('auth_id', '', {
        httpOnly: true,
        secure: true,
        maxAge: 8.64e+8,
        domain: process.env.ORIGIN,
        path: '/',
        port: 3000
    })]);
    
    res.redirect('/');
}