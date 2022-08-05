import { getRepository, Repository } from "typeorm";

import { ICreateUserTokenDTO } from "@modules/account/dtos/ICreateUserTokenDTO";
import { IFindByUserIdAndRefreshTokenDTO } from "@modules/account/dtos/IFindByUserIdAndRefreshTokenDTO";
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

  async findByUserIdAndRefreshToken({
    userId,
    refreshToken,
  }: IFindByUserIdAndRefreshTokenDTO) {
    const userToken = await this.repository.findOne({ userId, refreshToken });

    return userToken;
  }

  async deleteById(id: string) {
    await this.repository.delete(id);
  }
}

export { UserTokenRepository };
