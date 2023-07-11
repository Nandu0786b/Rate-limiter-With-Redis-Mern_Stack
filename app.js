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

//express app
const app=express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.disable("x-powered-by");


//routes
app.use('/', (req,res)=>{
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    console.log("ip is ",ip);

    res.json({"stats" : "ok", "limit" : "all thing is ok"})
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


