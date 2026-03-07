import {Ratelimit} from "@upstash/ratelimit";
import {Redis} from "@upstash/redis"
import dotenv from "dotenv"

dotenv.config();

//create a ratelimiter that allows 100 req per minute 
const ratelimit = new Ratelimit({
    redis:Redis.fromEnv(),
    limiter:Ratelimit.slidingWindow(100,"60 s")   //in 20 sec user can  5 requst 
})

export default ratelimit;