import { createClient } from 'redis';
import dotenv from "dotenv";
dotenv.config();
const Redis = createClient({
    password: process.env.redisPass,
    socket: {
        host: process.env.redisHost,
        port: 16669
    }
})


export default Redis;

