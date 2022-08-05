import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUserTokenRepository } from "@modules/account/repositories/IUserTokenRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UserTokenRepository")
    private userTokenRepository: IUserTokenRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(refreshToken: string) {
    const { email, sub } = verify(
      refreshToken,
      auth.refreshTokenSecret
    ) as IPayload;

    const userId = sub;

    const userToken =
      await this.userTokenRepository.findByUserIdAndRefreshToken({
        userId,
        refreshToken,
      });

    if (!userToken) {
      throw new AppError("Refresh Token does not exist");
    }

    await this.userTokenRepository.deleteById(userToken.id);

    const newRefreshToken = sign({ email }, auth.refreshTokenSecret, {
      subject: sub,
      expiresIn: auth.refreshTokenExpiresIn,
    });

    const refreshTokenExpireDate = this.dateProvider.addDays(
      auth.refreshTokenExpiresDays
    );

    await this.userTokenRepository.create({
      userId: sub,
      expireDate: refreshTokenExpireDate,
      refreshToken,
    });

    return newRefreshToken;
  }
}

export { RefreshTokenUseCase };
