import axios from "axios";
import mongoose from "mongoose";

export default async function connectMongoose() {
    if (!mongoose.connections[0].readyState) {
        if (!process.env.MONGO_URI) throw "No mongo url has been provided lmao. ";
        // TODO(scientific-dev): Make staffs a global variable...
        mongoose.staffs = new Map();
        const { data: staffData } = await axios.get("https://api.snowflakedev.org/api/d/staffs");
        for (const staff of staffData.data) {
            mongoose.staffs.set(staff.id, staff);
        }

        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
    }
}
