import mongoose from 'mongoose';

export default (handle) => async (req, res) => {
    if (mongoose.connections[0].readyState) return handle(req, res);
    await mongoose.connect(process.env.MONGO_URI);
    return handle(req, res);
}