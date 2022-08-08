import { InMemoryUserRepository } from "@modules/account/repositories/in-memory/InMemoryUserRepository";
import { InMemoryUserTokenRepository } from "@modules/account/repositories/in-memory/InMemoryUserTokenRepository";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { InMemoryMailProvider } from "@shared/container/providers/MailProvider/in-memory/InMemoryMailProvider";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let userRepository: InMemoryUserRepository;
let userTokenRepository: InMemoryUserTokenRepository;
let mailProvider: InMemoryMailProvider;
let dateProvider: DayjsDateProvider;
let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    userTokenRepository = new InMemoryUserTokenRepository();
    dateProvider = new DayjsDateProvider();
    mailProvider = new InMemoryMailProvider();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      userRepository,
      userTokenRepository,
      dateProvider,
      mailProvider
    );
  });

  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await userRepository.create({
      email: "john.doe@mail.com",
      name: "John Doe",
      password: "87654321",
      driverLicense: "HFG-7777",
    });

    await sendForgotPasswordMailUseCase.execute("john.doe@mail.com");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send a forgot password mail if user does not exist", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("john.doe@mail.com")
    ).rejects.toEqual(new AppError("User does not exist"));
  });

  it("should be able to create an user token", async () => {
    const createToken = jest.spyOn(userTokenRepository, "create");

    await userRepository.create({
      email: "john.doe@mail.com",
      name: "John Doe",
      password: "87654321",
      driverLicense: "HFG-7777",
    });

    await sendForgotPasswordMailUseCase.execute("john.doe@mail.com");

    expect(createToken).toHaveBeenCalled();
  });
});
