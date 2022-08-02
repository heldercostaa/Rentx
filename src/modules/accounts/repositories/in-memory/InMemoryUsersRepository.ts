import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class InMemoryUsersRepository implements IUsersRepository {
  private users: User[] = [];

  async findById(id: string) {
    return this.users.find((user) => user.id === id);
  }

  async findByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }

  async create({ name, email, password, driver_license }: ICreateUserDTO) {
    const user = new User();

    Object.assign(user, { name, email, password, driver_license });

    this.users.push(user);
  }
}

export { InMemoryUsersRepository };
