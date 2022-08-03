import { ICreateCarDTO } from "@modules/car/dtos/ICreateCarDTO";
import { IFindAvailableDTO } from "@modules/car/dtos/IFindAvailableDTO";
import { Car } from "@modules/car/infra/typeorm/entities/Car";

import { ICarRepository } from "../ICarRepository";

class InMemoryCarRepository implements ICarRepository {
  private cars: Car[] = [];

  async create({
    name,
    description,
    dailyRate,
    licensePlate,
    fineAmount,
    brand,
    categoryId,
  }: ICreateCarDTO) {
    const car = new Car();

    car.name = name;
    car.description = description;
    car.dailyRate = dailyRate;
    car.licensePlate = licensePlate;
    car.fineAmount = fineAmount;
    car.brand = brand;
    car.categoryId = categoryId;

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
}

export { InMemoryCarRepository };
