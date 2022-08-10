import { inject, injectable } from "tsyringe";

import { ICarImageRepository } from "@modules/car/repositories/ICarImageRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

interface IRequest {
  carId: string;
  imageNames: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarImageRepository")
    private carImageRepository: ICarImageRepository,

    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({ carId, imageNames }: IRequest) {
    imageNames.map(async (imageName) => {
      await this.carImageRepository.create({ carId, imageName });
      await this.storageProvider.save(imageName, "cars");
    });
  }
}

export { UploadCarImagesUseCase };
