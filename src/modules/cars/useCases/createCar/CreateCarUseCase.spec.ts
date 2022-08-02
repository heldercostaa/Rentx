import { InMemoryCarRepository } from "@modules/cars/repositories/in-memory/InMemoryCarRepository";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let inMemoryCarRepository: InMemoryCarRepository;

describe("Create Car", () => {
  beforeEach(() => {
    inMemoryCarRepository = new InMemoryCarRepository();
    createCarUseCase = new CreateCarUseCase(inMemoryCarRepository);
  });

  it("should be able to create a new Car", async () => {
    await createCarUseCase.execute({
      name: "Car Name",
      description: "Car description",
      dailyRate: 100,
      licensePlate: "ABC-1234",
      fineAmount: 60,
      brand: "Brand",
      categoryId: "abcd-1234",
    });
  });
});
