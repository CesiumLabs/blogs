export default (req, res) => {
    res.redirect(`https://discord.com/api/oauth2/authorize?response_type=code&client_id=${process.env.DISCORD_CLIENT_ID}&scope=identify&redirect_uri=${encodeURIComponent(`${process.env.URL}/authorize/callback`)}&prompt=consent`);
};
