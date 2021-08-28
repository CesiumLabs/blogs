import { User } from '../../../../utils/schemas';

const headerKeys = ['bio', 'twitter', 'github', 'website'];

export default async (req, res) => {
    if (req.method == "POST") {
        const newUser = {};
        for (const key of headerKeys)
            if (req.headers[key])
                newUser[key] = req.headers[key];
        
        await User.findOneAndUpdate({ id: req.query.id }, newUser);
        res.status(200).json({});
    } else res.status(404).json({})
}