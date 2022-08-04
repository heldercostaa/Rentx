import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/car/dtos/ICreateCarDTO";
import { IFindAvailableDTO } from "@modules/car/dtos/IFindAvailableDTO";
import { IUpdateAvailableDTO } from "@modules/car/dtos/IUpdateAvailableDTO";
import { ICarRepository } from "@modules/car/repositories/ICarRepository";

import { Car } from "../entities/Car";

class CarRepository implements ICarRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    id,
    name,
    description,
    dailyRate,
    licensePlate,
    brand,
    fineAmount,
    categoryId,
    specifications,
  }: ICreateCarDTO) {
    const car = this.repository.create({
      id,
      name,
      description,
      dailyRate,
      licensePlate,
      brand,
      fineAmount,
      categoryId,
      specifications,
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

  async findById(id: string) {
    return this.repository.findOne(id);
  }

  async updateAvailable({ id, available }: IUpdateAvailableDTO) {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where("id = :id")
      .setParameters({ id })
      .execute();
  }
}

export { CarRepository };
