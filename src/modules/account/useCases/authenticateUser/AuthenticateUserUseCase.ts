import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUserRepository } from "@modules/account/repositories/IUserRepository";
import { IUserTokenRepository } from "@modules/account/repositories/IUserTokenRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,

    @inject("UserTokenRepository")
    private userTokenRepository: IUserTokenRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ email, password }: IRequest) {
    const user = await this.userRepository.findByEmail(email);
    const {
      expiresIn,
      tokenSecret,
      refreshTokenSecret,
      refreshTokenExpiresIn,
      refreshTokenExpiresDays,
    } = auth;

    if (!user) {
      throw new AppError("Incorrect email or password");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Incorrect email or password");
    }

    const token = sign({}, tokenSecret, {
      subject: user.id,
      expiresIn,
    });

    const refreshToken = sign({ email }, refreshTokenSecret, {
      subject: user.id,
      expiresIn: refreshTokenExpiresIn,
    });

    const refreshTokenExpireDate = this.dateProvider.addDays(
      refreshTokenExpiresDays
    );

    await this.userTokenRepository.create({
      userId: user.id,
      expireDate: refreshTokenExpireDate,
      refreshToken,
    });

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
      refreshToken,
    };
  }
}

export { AuthenticateUserUseCase };
