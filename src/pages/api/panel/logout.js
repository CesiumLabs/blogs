export default (req, res) => {
    res.clearCookie('auth_id');
    res.redirect('/');
}