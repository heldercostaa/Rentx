import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { IUserRepository } from "@modules/account/repositories/IUserRepository";
import { IUserTokenRepository } from "@modules/account/repositories/IUserTokenRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetUserPasswordUseCase {
  constructor(
    @inject("UserTokenRepository")
    private userTokenRepository: IUserTokenRepository,

    @inject("UserRepository")
    private userRepository: IUserRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ token: refreshToken, password }: IRequest) {
    const userToken = await this.userTokenRepository.findByRefreshToken(
      refreshToken
    );

    if (!userToken) {
      throw new AppError("Invalid Token");
    }

    if (this.dateProvider.compareIfBefore(userToken.expireDate, new Date())) {
      throw new AppError("Token has expired");
    }

    const user = await this.userRepository.findById(userToken.userId);

    user.password = await hash(password, 8);

    await this.userRepository.create(user);

    await this.userTokenRepository.deleteById(userToken.id);
  }
}

export { ResetUserPasswordUseCase };
