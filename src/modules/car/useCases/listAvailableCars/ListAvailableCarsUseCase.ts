import { inject, injectable } from "tsyringe";

import { ICarRepository } from "@modules/car/repositories/ICarRepository";

interface IRequest {
  name?: string;
  brand?: string;
  categoryId?: string;
}

@injectable()
class ListAvailableCarsUseCase {
  constructor(@inject("CarRepository") private carRepository: ICarRepository) {}

  async execute({ categoryId, brand, name }: IRequest) {
    const cars = await this.carRepository.findAvailable({
      name,
      brand,
      categoryId,
    });

    return cars;
  }
}

export { ListAvailableCarsUseCase };
