import axios from "axios";
import mongoose from "mongoose";

export default async function connectMongoose() {
    if (!global.authCache) global.authCache = new Map();
    if (!global.staffs) {
        global.staffs = new Map();
        const { data: staffData } = await axios.get("https://api.snowflakedev.org/api/d/staffs");
        for (const staff of staffData.data) {
            global.staffs.set(staff.id, staff);
        }
    }

    if (!mongoose.connection?.readyState) {
        if (!process.env.MONGO_URI) throw "No mongo url has been provided";
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands: false,
            bufferMaxEntries: 0
        });
    }
}
