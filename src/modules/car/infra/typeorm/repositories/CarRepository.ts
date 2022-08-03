import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/car/dtos/ICreateCarDTO";
import { ICarRepository } from "@modules/car/repositories/ICarRepository";

import { Car } from "../entities/Car";

class CarRepository implements ICarRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    name,
    description,
    dailyRate,
    licensePlate,
    brand,
    fineAmount,
    categoryId,
  }: ICreateCarDTO) {
    const car = this.repository.create({
      name,
      description,
      dailyRate,
      licensePlate,
      brand,
      fineAmount,
      categoryId,
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(licensePlate: string) {
    const car = this.repository.findOne({ licensePlate });

    return car;
  }
}

export { CarRepository };
