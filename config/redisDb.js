import { createClient } from 'redis';
import dotenv from "dotenv";
dotenv.config();
const Redis = createClient({
    password: process.env.redisPass,
    socket: {
        host: process.env.redisHost,
        port: process.env.redisPost,
    }
})


export default Redis;

