import { inject, injectable } from "tsyringe";

import { ICategoryRepository } from "@modules/car/repositories/ICategoryRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository
  ) {}

  async execute({ name, description }: IRequest) {
    const categoryAlreadyExists = await this.categoryRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      throw new AppError("Category already exists");
    }

    const category = this.categoryRepository.create({ name, description });

    return category;
  }
}

export { CreateCategoryUseCase };
