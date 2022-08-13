import { NextFunction, Request, Response } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";
import { createClient } from "redis";

import { AppError } from "@shared/errors/AppError";

const redisClient = createClient({
  legacyMode: true,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});

redisClient.connect();

const rateLimiterClient = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "rateLimiter",
  points: 10,
  duration: 5,
});

async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    await rateLimiterClient.consume(request.ip);

    return next();
  } catch (e) {
    console.log(e);
    throw new AppError("Too many requests", 429);
  }
}

export { rateLimiter };
