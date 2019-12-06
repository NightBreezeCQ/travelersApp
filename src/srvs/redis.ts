
import Redis from "ioredis";
import config from "../config/development";

const redis = new Redis(config.redis);

export default redis;