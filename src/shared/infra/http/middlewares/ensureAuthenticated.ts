import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";
import { UserTokenRepository } from "@modules/account/infra/typeorm/repositories/UserTokenRepository";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  const userTokenRepository = new UserTokenRepository();

  if (!authHeader) {
    throw new AppError("Missing authorization token", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: userId } = verify(token, auth.refreshTokenSecret) as IPayload;

    const user = await userTokenRepository.findByUserIdAndRefreshToken({
      userId,
      refreshToken: token,
    });

    if (!user) {
      throw new AppError("User does not exist", 401);
    }

    request.user = { id: userId };

    next();
  } catch {
    throw new AppError("Invalid token", 401);
  }
}
