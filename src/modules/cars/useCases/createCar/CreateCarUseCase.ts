import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

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
