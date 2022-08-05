interface ICreateUserTokenDTO {
  userId: string;
  expireDate: Date;
  refreshToken: string;
}

export { ICreateUserTokenDTO };
