import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UserToken } from "../infra/typeorm/entities/UserToken";

interface IUserTokenRepository {
  create({
    userId,
    expireDate,
    refreshToken,
  }: ICreateUserTokenDTO): Promise<UserToken>;
}

export { IUserTokenRepository };
