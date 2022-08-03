import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UserRepository } from "@modules/account/infra/typeorm/repositories/UserRepository";
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

  if (!authHeader) {
    throw new AppError("Missing authorization token", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: userId } = verify(
      token,
      "f34fa5ab9805c87d7a19050d14486e82"
    ) as IPayload;

    const userRepository = new UserRepository();
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new AppError("User does not exists", 401);
    }

    request.user = { id: userId };

    next();
  } catch {
    throw new AppError("Invalid token", 401);
  }
}
