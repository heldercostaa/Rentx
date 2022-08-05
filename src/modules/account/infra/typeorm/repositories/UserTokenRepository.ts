import { getRepository, Repository } from "typeorm";

import { ICreateUserTokenDTO } from "@modules/account/dtos/ICreateUserTokenDTO";
import { IUserTokenRepository } from "@modules/account/repositories/IUserTokenRepository";

import { UserToken } from "../entities/UserToken";

class UserTokenRepository implements IUserTokenRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = getRepository(UserToken);
  }

  async create({ userId, expireDate, refreshToken }: ICreateUserTokenDTO) {
    const userToken = this.repository.create({
      userId,
      expireDate,
      refreshToken,
    });

    await this.repository.save(userToken);

    return userToken;
  }
}

export { UserTokenRepository };
