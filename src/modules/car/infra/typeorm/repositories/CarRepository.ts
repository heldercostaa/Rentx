import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/car/dtos/ICreateCarDTO";
import { IFindAvailableDTO } from "@modules/car/dtos/IFindAvailableDTO";
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

  async findAvailable({ name, brand, categoryId }: IFindAvailableDTO) {
    const carsQuery = await this.repository
      .createQueryBuilder("car")
      .where("available = :available", { available: true });

    if (name) {
      carsQuery.andWhere("name = :name", { name });
    }

    if (brand) {
      carsQuery.andWhere("brand = :brand", { brand });
    }

    if (categoryId) {
      carsQuery.andWhere("category_id = :categoryId", { categoryId });
    }

    const cars = await carsQuery.getMany();

    return cars;
  }
}

export { CarRepository };
