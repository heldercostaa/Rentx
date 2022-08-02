import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
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

class CreateCarUseCase {
  constructor(private carRepository: ICarsRepository) {}

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

    await this.carRepository.create({
      name,
      description,
      dailyRate,
      licensePlate,
      fineAmount,
      brand,
      categoryId,
    });
  }
}

export { CreateCarUseCase };
