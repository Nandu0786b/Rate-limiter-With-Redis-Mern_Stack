//import default
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";


//config variable from .env

dotenv.config();
const PORT=process.env.PORT;
const DB_URI=process.env.mongourl;

//import custom
import conneectDB from "./config/connectdb.js";
import  Redis  from "./config/redisDb.js";

//express app
const app=express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.disable("x-powered-by");

Redis.on('error', err => console.log('Redis Client Error', err))
.connect();
//routes
app.use('/', async (req,res)=>{
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const requests = await Redis.incr(ip);
    console.log("ip is ",ip);
    let ttl;
    if(requests === 1){
        ttl = await Redis.expire(ip, 60);
    }
    if(requests>20){
       ttl = await Redis.ttl(ip);
       return  res.status(400).json({"stats" : "ok", "limit" : "Out of Range","Api Calls":requests,"WaitTime":ttl})
    }
    return res.json({"stats" : "ok", "limit" : "all thing is ok","Api Calls":requests});
});

conneectDB(DB_URI).then(()=>{
    try {
        app.listen(PORT, ()=>{
            console.log(`server running at http://localhost:${PORT}`);
        })
    } catch (error) {
        console.log("error during the Server Start");
        console.log(error);
    }
}).catch(error=>{
    console.log("Invalid database connection................!");
    console.log(error);
    console.log("Check the Mongo DB connection and restart");
})


