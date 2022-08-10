import { instanceToInstance } from "class-transformer";

import { IUserMapDTO } from "../dtos/IUserMapDTO";
import { User } from "../infra/typeorm/entities/User";

class UserMap {
  static toDTO({
    id,
    name,
    email,
    avatar,
    driverLicense,
    avatarUrl,
  }: User): IUserMapDTO {
    const user = instanceToInstance({
      id,
      name,
      email,
      avatar,
      driverLicense,
      avatarUrl,
    });

    return user;
  }
}

export { UserMap };
