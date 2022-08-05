import { inject, injectable } from "tsyringe";

import { ICarRepository } from "@modules/car/repositories/ICarRepository";
import { ISpecificationRepository } from "@modules/car/repositories/ISpecificationRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  carId: string;
  specificationIds: string[];
}

@injectable()
class SetCarSpecificationUseCase {
  constructor(
    @inject("CarRepository")
    private carRepository: ICarRepository,

    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationRepository
  ) {}

  async execute({ carId, specificationIds }: IRequest) {
    const car = await this.carRepository.findById(carId);

    if (!car) {
      throw new AppError("Car does not exist");
    }

    const specifications = await this.specificationRepository.findByIds(
      specificationIds
    );

    car.specifications = specifications;

    const updatedCar = await this.carRepository.create(car);

    return updatedCar;
  }
}

export { SetCarSpecificationUseCase };
