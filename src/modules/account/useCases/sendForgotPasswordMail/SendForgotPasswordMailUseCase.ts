import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

import { IUserRepository } from "@modules/account/repositories/IUserRepository";
import { IUserTokenRepository } from "@modules/account/repositories/IUserTokenRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,

    @inject("UserTokenRepository")
    private userTokenRepository: IUserTokenRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,

    @inject("EtherealMailProvider")
    private mailProvider: IMailProvider
  ) {}

  async execute(email: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User does not exist");
    }

    const token = uuidV4();

    const expireDate = this.dateProvider.addHours(3);

    const templatePath = resolve(
      __dirname,
      "..",
      "..",
      "views",
      "emails",
      "forgotPassword.hbs"
    );

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`,
    };

    await this.userTokenRepository.create({
      userId: user.id,
      expireDate,
      refreshToken: token,
    });

    await this.mailProvider.sendMail(
      email,
      "Password Recovery",
      variables,
      templatePath
    );
  }
}

export { SendForgotPasswordMailUseCase };
