import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { IFindByUserIdAndRefreshTokenDTO } from "../dtos/IFindByUserIdAndRefreshTokenDTO";
import { UserToken } from "../infra/typeorm/entities/UserToken";

interface IUserTokenRepository {
  create({
    userId,
    expireDate,
    refreshToken,
  }: ICreateUserTokenDTO): Promise<UserToken>;

  findByUserIdAndRefreshToken({
    userId,
    refreshToken,
  }: IFindByUserIdAndRefreshTokenDTO): Promise<UserToken>;

  deleteById(id: string): Promise<void>;
}

export { IUserTokenRepository };
