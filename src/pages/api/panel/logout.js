import cookie from 'cookie';
import { defaultCookieOptions } from '../../../utils';

export default (req, res) => {
    res.setHeader('Set-Cookie', [cookie.serialize('auth_id', '', defaultCookieOptions), cookie.serialize('rank', 0, defaultCookieOptions)]);
    res.redirect('/');
}