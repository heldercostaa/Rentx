import { getRepository, Repository } from "typeorm";

import { ICreateRentalDTO } from "@modules/rental/dtos/ICreateRentalDTO";
import { IRentalRepository } from "@modules/rental/repositories/IRentalRepository";

import { Rental } from "../entities/Rental";

class RentalRepository implements IRentalRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async create({ userId, carId, expectedReturnDate }: ICreateRentalDTO) {
    const rental = this.repository.create({
      userId,
      carId,
      expectedReturnDate,
    });

    await this.repository.save(rental);

    return rental;
  }

  async findOpenByCarId(carId: string) {
    const openRentalByCar = this.repository.findOne({ carId });

    return openRentalByCar;
  }

  async findOpenByUserId(userId: string) {
    const openRentalByUser = this.repository.findOne({ userId });

    return openRentalByUser;
  }
}

export { RentalRepository };
