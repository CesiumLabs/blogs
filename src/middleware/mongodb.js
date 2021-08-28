import mongoose from 'mongoose';

export default async function connectMongoose() {
    if (!mongoose.connections[0].readyState) 
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })       
}