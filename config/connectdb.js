import mongoose from "mongoose";

const conneectDB = async (DB_URI)=>{
        const DB_OPTIONs={
            dbName : "User",
            maxPoolSize: 10
        }
        await mongoose.connect(DB_URI, DB_OPTIONs);
        console.log("Connected Successfully........");
}

export default conneectDB;