import { InMemoryUserRepository } from "@modules/account/repositories/in-memory/InMemoryUserRepository";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let inMemoryUserRepository: InMemoryUserRepository;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUserRepository
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
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "johndoe@mail.com",
        password: "abc123",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate if incorrect password", async () => {
    expect(async () => {
      const user = {
        name: "John Doe",
        email: "johndoe@mail.com",
        password: "abc123",
        driverLicense: "99999",
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: "johndoe@mail.com",
        password: "wrong_password",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
