import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

import { Car } from "../entities/Car";

class CarRepository implements ICarsRepository {
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
      daily_rate: dailyRate,
      license_plate: licensePlate,
      brand,
      fine_amount: fineAmount,
      category_id: categoryId,
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(licensePlate: string) {
    const car = this.repository.findOne({ license_plate: licensePlate });

    return car;
  }
}

export { CarRepository };
