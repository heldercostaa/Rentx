import { InMemoryCarRepository } from "@modules/car/repositories/in-memory/InMemoryCarRepository";
import { InMemorySpecificationRepository } from "@modules/car/repositories/in-memory/InMemorySpecificationRepository";
import { AppError } from "@shared/errors/AppError";

import { SetCarSpecificationUseCase } from "./SetCarSpecificationUseCase";

let setCarSpecificationUseCase: SetCarSpecificationUseCase;
let inMemoryCarRepository: InMemoryCarRepository;
let inMemorySpecificationRepository: InMemorySpecificationRepository;

describe("Set Car Specification", () => {
  beforeEach(() => {
    inMemoryCarRepository = new InMemoryCarRepository();
    inMemorySpecificationRepository = new InMemorySpecificationRepository();
    setCarSpecificationUseCase = new SetCarSpecificationUseCase(
      inMemoryCarRepository,
      inMemorySpecificationRepository
    );
  });

  it("shuold be able to set a specification to a car", async () => {
    const carId = "non_existent_id";
    const specificationIds = [];

    await expect(
      setCarSpecificationUseCase.execute({ carId, specificationIds })
    ).rejects.toEqual(new AppError("Car does not exist"));
  });

  it("should not be able to set a specification to a non existent car", async () => {
    const car = await inMemoryCarRepository.create({
      name: "Car Name",
      description: "Car description",
      dailyRate: 100,
      licensePlate: "ABC-1234",
      fineAmount: 60,
      brand: "Brand",
      categoryId: "abcd-1234",
    });

    const specification = await inMemorySpecificationRepository.create({
      name: "ABS",
      description:
        "Anti-lock braking system, or ABS, is a system that keeps your wheels from locking when you brake hard.",
    });

    const carSpecifications = await setCarSpecificationUseCase.execute({
      carId: car.id,
      specificationIds: [specification.id],
    });

    expect(carSpecifications).toHaveProperty("specifications");
    expect(carSpecifications.specifications.length).toBe(1);
  });
});
