import { Request, Response } from "express";
import { container } from "tsyringe";

import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

class RefreshTokenController {
  async handle(request: Request, response: Response) {
    const refreshToken =
      request.body.token ||
      request.headers["x-access-token"] ||
      request.query.token;

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

    const newRefreshToken = await refreshTokenUseCase.execute(refreshToken);

    return response.json(newRefreshToken);
  }
}

export { RefreshTokenController };
