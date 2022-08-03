import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "@modules/account/dtos/ICreateUserDTO";
import { User } from "@modules/account/infra/typeorm/entities/User";

import { IUserRepository } from "../../../repositories/IUserRepository";

class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    avatar,
    name,
    email,
    password,
    driverLicense,
  }: ICreateUserDTO) {
    const user = this.repository.create({
      avatar,
      name,
      email,
      password,
      driverLicense,
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string) {
    const user = await this.repository.findOne({ email });

    return user;
  }

  async findById(id: string) {
    const user = await this.repository.findOne(id);

    return user;
  }
}

export { UserRepository };
