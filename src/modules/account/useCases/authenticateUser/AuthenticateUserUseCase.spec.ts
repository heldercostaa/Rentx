import { InMemoryUserRepository } from "@modules/account/repositories/in-memory/InMemoryUserRepository";
import { InMemoryUserTokenRepository } from "@modules/account/repositories/in-memory/InMemoryUserTokenRepository";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let inMemoryUserRepository: InMemoryUserRepository;
let inMemoryUserTokenRepository: InMemoryUserTokenRepository;
let dateProvider: DayjsDateProvider;

describe("Authenticate User", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    inMemoryUserTokenRepository = new InMemoryUserTokenRepository();
    dateProvider = new DayjsDateProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUserRepository,
      inMemoryUserTokenRepository,
      dateProvider
    );
    createUserUseCase = new CreateUserUseCase(inMemoryUserRepository);
  });

  it("should be able to authenticate an user", async () => {
    const user = {
      name: "John Doe",
      email: "johndoe@mail.com",
      password: "abc123",
      driverLicense: "99999",
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate a non existent user", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: "johndoe@mail.com",
        password: "abc123",
      })
    ).rejects.toEqual(new AppError("Incorrect email or password"));
  });

  it("should not be able to authenticate if incorrect password", async () => {
    const user = {
      name: "John Doe",
      email: "johndoe@mail.com",
      password: "abc123",
      driverLicense: "99999",
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: "johndoe@mail.com",
        password: "wrong_password",
      })
    ).rejects.toEqual(new AppError("Incorrect email or password"));
  });
});
