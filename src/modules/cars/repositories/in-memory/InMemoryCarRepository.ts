import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class InMemoryCarRepository implements ICarsRepository {
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
    car.daily_rate = dailyRate;
    car.license_plate = licensePlate;
    car.fine_amount = fineAmount;
    car.brand = brand;
    car.category_id = categoryId;

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(licensePlate: string) {
    return this.cars.find((car) => car.license_plate === licensePlate);
  }
}

export { InMemoryCarRepository };
