import { ICreateUserDTO } from "@modules/account/dtos/ICreateUserDTO";
import { User } from "@modules/account/infra/typeorm/entities/User";

import { IUserRepository } from "../IUserRepository";

class InMemoryUserRepository implements IUserRepository {
  private users: User[] = [];

  async findById(id: string) {
    return this.users.find((user) => user.id === id);
  }

  async findByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }

  async create({ name, email, password, driverLicense }: ICreateUserDTO) {
    const user = new User();

    Object.assign(user, { name, email, password, driverLicense });

    this.users.push(user);
  }
}

export { InMemoryUserRepository };
