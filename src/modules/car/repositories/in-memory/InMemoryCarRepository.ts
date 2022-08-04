import { ICreateCarDTO } from "@modules/car/dtos/ICreateCarDTO";
import { IFindAvailableDTO } from "@modules/car/dtos/IFindAvailableDTO";
import { IUpdateAvailableDTO } from "@modules/car/dtos/IUpdateAvailableDTO";
import { Car } from "@modules/car/infra/typeorm/entities/Car";

import { ICarRepository } from "../ICarRepository";

class InMemoryCarRepository implements ICarRepository {
  private cars: Car[] = [];

  async create({
    id,
    name,
    description,
    dailyRate,
    licensePlate,
    fineAmount,
    brand,
    categoryId,
    specifications,
  }: ICreateCarDTO) {
    const car = new Car();

    if (id) car.id = id;
    car.name = name;
    car.description = description;
    car.dailyRate = dailyRate;
    car.licensePlate = licensePlate;
    car.fineAmount = fineAmount;
    car.brand = brand;
    car.categoryId = categoryId;
    if (specifications) car.specifications = specifications;

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(licensePlate: string) {
    return this.cars.find((car) => car.licensePlate === licensePlate);
  }

  async findAvailable({ categoryId, brand, name }: IFindAvailableDTO) {
    return this.cars.filter(
      (car) =>
        car.available ||
        (brand && car.brand === brand) ||
        (categoryId && car.categoryId === categoryId) ||
        (name && car.name === name)
    );
  }

  async findById(id: string) {
    return this.cars.find((car) => car.id === id);
  }

  async updateAvailable({ id, available }: IUpdateAvailableDTO) {
    const carIdx = this.cars.findIndex((car) => car.id === id);

    this.cars[carIdx].available = available;
  }
}

export { InMemoryCarRepository };
