import { ICreateUserTokenDTO } from "@modules/account/dtos/ICreateUserTokenDTO";
import { IFindByUserIdAndRefreshTokenDTO } from "@modules/account/dtos/IFindByUserIdAndRefreshTokenDTO";
import { UserToken } from "@modules/account/infra/typeorm/entities/UserToken";

import { IUserTokenRepository } from "../IUserTokenRepository";

class InMemoryUserTokenRepository implements IUserTokenRepository {
  private userTokens: UserToken[] = [];

  async create({ userId, expireDate, refreshToken }: ICreateUserTokenDTO) {
    const userToken = new UserToken();

    userToken.userId = userId;
    userToken.expireDate = expireDate;
    userToken.refreshToken = refreshToken;

    this.userTokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken({
    userId,
    refreshToken,
  }: IFindByUserIdAndRefreshTokenDTO) {
    return this.userTokens.find(
      (userToken) =>
        userToken.userId === userId && userToken.refreshToken === refreshToken
    );
  }

  async deleteById(id: string) {
    const userIdx = this.userTokens.findIndex(
      (userToken) => userToken.id === id
    );

    this.userTokens.splice(userIdx, 1);
  }

  async findByRefreshToken(refreshToken: string) {
    return this.userTokens.find(
      (userToken) => userToken.refreshToken === refreshToken
    );
  }
}

export { InMemoryUserTokenRepository };
