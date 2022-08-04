import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../infra/typeorm/entities/User";

interface IUserRepository {
  create({
    id,
    name,
    email,
    password,
    driverLicense,
    avatar,
  }: ICreateUserDTO): Promise<void>;

  findByEmail(email: string): Promise<User | undefined>;

  findById(id: string): Promise<User | undefined>;
}

export { IUserRepository };
