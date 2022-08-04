import { getRepository, Repository } from "typeorm";

import { ICreateCarImageDTO } from "@modules/car/dtos/ICreateCarImageDTO";
import { ICarImageRepository } from "@modules/car/repositories/ICarImageRepository";

import { CarImage } from "../entities/CarImage";

class CarImageRepository implements ICarImageRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }

  async create({ carId, imageName }: ICreateCarImageDTO) {
    const carImage = this.repository.create({
      carId,
      imageName,
    });

    await this.repository.save(carImage);

    return carImage;
  }
}

export { CarImageRepository };
