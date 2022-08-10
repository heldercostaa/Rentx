import { inject, injectable } from "tsyringe";

import { UserMap } from "@modules/account/mapper/UserMap";
import { IUserRepository } from "@modules/account/repositories/IUserRepository";

@injectable()
class UserProfileUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(id: string) {
    const user = await this.userRepository.findById(id);

    return UserMap.toDTO(user);
  }
}

export { UserProfileUseCase };
