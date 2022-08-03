import { InMemoryCarRepository } from "@modules/car/repositories/in-memory/InMemoryCarRepository";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let inMemoryCarRepository: InMemoryCarRepository;

describe("Create Car", () => {
  beforeEach(() => {
    inMemoryCarRepository = new InMemoryCarRepository();
    createCarUseCase = new CreateCarUseCase(inMemoryCarRepository);
  });

  it("should be able to create a new Car", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Name",
      description: "Car description",
      dailyRate: 100,
      licensePlate: "ABC-1234",
      fineAmount: 60,
      brand: "Brand",
      categoryId: "abcd-1234",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with if license plate is already registered", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Car Name",
        description: "Car description",
        dailyRate: 100,
        licensePlate: "ABC-1234",
        fineAmount: 60,
        brand: "Brand",
        categoryId: "abcd-1234",
      });

      await createCarUseCase.execute({
        name: "Car Name",
        description: "Car description",
        dailyRate: 100,
        licensePlate: "ABC-1234",
        fineAmount: 60,
        brand: "Brand",
        categoryId: "abcd-1234",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create a car with availability true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Name",
      description: "Car description",
      dailyRate: 100,
      licensePlate: "ABC-1234",
      fineAmount: 60,
      brand: "Brand",
      categoryId: "abcd-1234",
    });

    expect(car.available).toBe(true);
  });
});
