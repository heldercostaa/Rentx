import { inject, injectable } from "tsyringe";

import { IRentalRepository } from "@modules/rental/repositories/IRentalRepository";

@injectable()
class ListRentalsByUserUseCase {
  constructor(
    @inject("RentalRepository")
    private rentalRepository: IRentalRepository
  ) {}

  async execute(userId: string) {
    const rentalByUser = await this.rentalRepository.findByUserId(userId);

    return rentalByUser;
  }
}

export { ListRentalsByUserUseCase };
