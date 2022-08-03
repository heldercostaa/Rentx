import { InMemoryCategoryRepository } from "@modules/car/repositories/in-memory/InMemoryCategoryRepository";
import { AppError } from "@shared/errors/AppError";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let inMemoryCategoryRepository: InMemoryCategoryRepository;

describe("Create Category", () => {
  beforeEach(() => {
    inMemoryCategoryRepository = new InMemoryCategoryRepository();
    createCategoryUseCase = new CreateCategoryUseCase(
      inMemoryCategoryRepository
    );
  });

  it("should be able to create a new category", async () => {
    const category = {
      name: "SUV",
      description:
        "Cars that combine elements of road-going passenger cars with features from off-road vehicles.",
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    const createdCategory = await inMemoryCategoryRepository.findByName(
      category.name
    );

    expect(createdCategory).toHaveProperty("id");
  });

  it("should not be able to create a new category with existing name", async () => {
    expect(async () => {
      const category = {
        name: "SUV",
        description:
          "Cars that combine elements of road-going passenger cars with features from off-road vehicles.",
      };

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
