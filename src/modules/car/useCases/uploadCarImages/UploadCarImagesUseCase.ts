import { inject, injectable } from "tsyringe";

import { ICarImageRepository } from "@modules/car/repositories/ICarImageRepository";

interface IRequest {
  carId: string;
  imageNames: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarImageRepository")
    private carImageRepository: ICarImageRepository
  ) {}

  async execute({ carId, imageNames }: IRequest) {
    imageNames.map(async (imageName) => {
      await this.carImageRepository.create({ carId, imageName });
    });
  }
}

export { UploadCarImagesUseCase };
