import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "@modules/account/dtos/ICreateUserDTO";
import { IUserRepository } from "@modules/account/repositories/IUserRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({ name, email, password, driverLicense }: ICreateUserDTO) {
    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      throw new AppError("User already exists");
    }

    const passwordHash = await hash(password, 8);

    await this.userRepository.create({
      name,
      email,
      password: passwordHash,
      driverLicense,
    });
  }
}

export { CreateUserUseCase };
