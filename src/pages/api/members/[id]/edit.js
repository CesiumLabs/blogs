import { User } from "../../../../utils/schemas";

const headerKeys = ["bio", "twitter", "github", "website"];

export default async (req, res) => {
    if (req.method == "POST" && req.headers.origin == process.env.ORIGIN) {
        const newUser = {};
        for (const key of headerKeys) if (req.headers[key]) newUser[key] = req.headers[key];

        await User.findOneAndUpdate({ id: req.query.id }, newUser);
        res.status(204).end();
    } else res.status(404).json({});
};
