import { AppError } from "@errors/AppError";
import { InMemoryCategoriesRepository } from "@modules/cars/repositories/in-memory/InMemoryCategoriesRepository";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let inMemoryCategoriesRepository: InMemoryCategoriesRepository;

describe("Create Category", () => {
  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
    createCategoryUseCase = new CreateCategoryUseCase(
      inMemoryCategoriesRepository
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

    const createdCategory = await inMemoryCategoriesRepository.findByName(
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
