interface IUserMapDTO {
  id: string;
  name: string;
  email: string;
  avatar: string;
  driverLicense: string;
  avatarUrl(): string;
}

export { IUserMapDTO };
