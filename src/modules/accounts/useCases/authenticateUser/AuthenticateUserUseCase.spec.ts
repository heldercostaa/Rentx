import { AppError } from "../../../../errors/AppError";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUsersRepository
    );
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it("should be able to authenticate an user", async () => {
    const user = {
      name: "John Doe",
      email: "johndoe@mail.com",
      password: "abc123",
      driver_license: "99999",
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate a nonexistent user", async () => {
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
        driver_license: "99999",
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: "johndoe@mail.com",
        password: "wrong_password",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
