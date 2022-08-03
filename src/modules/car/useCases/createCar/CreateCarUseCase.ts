import { inject, injectable } from "tsyringe";

import { ICarRepository } from "@modules/car/repositories/ICarRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  description: string;
  dailyRate: number;
  licensePlate: string;
  fineAmount: number;
  brand: string;
  categoryId: string;
}

@injectable()
class CreateCarUseCase {
  constructor(@inject("CarRepository") private carRepository: ICarRepository) {}

  async execute({
    name,
    description,
    dailyRate,
    licensePlate,
    fineAmount,
    brand,
    categoryId,
  }: IRequest) {
    const carExists = await this.carRepository.findByLicensePlate(licensePlate);

    if (carExists) {
      throw new AppError("License plate already registered!");
    }

    const car = await this.carRepository.create({
      name,
      description,
      dailyRate,
      licensePlate,
      fineAmount,
      brand,
      categoryId,
    });

    return car;
  }
}

export { CreateCarUseCase };
