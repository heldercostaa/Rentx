import { getRepository, Repository } from "typeorm";

import { ICreateRentalDTO } from "@modules/rental/dtos/ICreateRentalDTO";
import { IRentalRepository } from "@modules/rental/repositories/IRentalRepository";

import { Rental } from "../entities/Rental";

class RentalRepository implements IRentalRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async create({
    id,
    userId,
    carId,
    expectedReturnDate,
    total,
    endDate,
  }: ICreateRentalDTO) {
    const rental = this.repository.create({
      id,
      userId,
      carId,
      expectedReturnDate,
      total,
      endDate,
    });

    await this.repository.save(rental);

    return rental;
  }

  async findOpenByCarId(carId: string) {
    const openRentalByCar = this.repository.findOne({
      where: { carId, endDate: null },
    });

    return openRentalByCar;
  }

  async findOpenByUserId(userId: string) {
    const openRentalByUser = this.repository.findOne({
      where: { userId, endDate: null },
    });

    return openRentalByUser;
  }

  async findById(id: string) {
    const rental = await this.repository.findOne(id);

    return rental;
  }

  async findByUserId(userId: string) {
    const rentals = await this.repository.find({
      where: { userId },
      relations: ["car"],
    });

    return rentals;
  }
}

export { RentalRepository };
