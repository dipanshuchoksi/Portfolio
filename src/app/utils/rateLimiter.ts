import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

if (!REDIS_TOKEN || !REDIS_URL) {
  throw new Error("redis url or token is invalid");
}

const redis = new Redis({
  url: REDIS_URL,
  token: REDIS_TOKEN,
});

export const rateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(20, "30 m"),
  prefix: "middleware",
});
