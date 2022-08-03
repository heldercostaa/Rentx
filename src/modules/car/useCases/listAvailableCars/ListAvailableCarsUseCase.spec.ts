import { InMemoryCarRepository } from "@modules/car/repositories/in-memory/InMemoryCarRepository";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let inMemoryCarRepository: InMemoryCarRepository;

describe("List Cars", () => {
  beforeEach(() => {
    inMemoryCarRepository = new InMemoryCarRepository();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      inMemoryCarRepository
    );
  });

  it("should be able to list all available cars", async () => {
    const car = await inMemoryCarRepository.create({
      name: "Audi e-Tron GT",
      description: "German luxury vehicle.",
      dailyRate: 140,
      licensePlate: "HGF-7777",
      fineAmount: 100,
      brand: "Audi",
      categoryId: "7b064163-6909-49ac-a066-1c8546d6ce75",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await inMemoryCarRepository.create({
      name: "Audi e-Tron GT",
      description: "German luxury vehicle.",
      dailyRate: 140,
      licensePlate: "HGF-7777",
      fineAmount: 100,
      brand: "Audi",
      categoryId: "7b064163-6909-49ac-a066-1c8546d6ce75",
    });

    const cars = await listAvailableCarsUseCase.execute({ name: car.name });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await inMemoryCarRepository.create({
      name: "Audi e-Tron GT",
      description: "German luxury vehicle.",
      dailyRate: 140,
      licensePlate: "HGF-7777",
      fineAmount: 100,
      brand: "Audi",
      categoryId: "7b064163-6909-49ac-a066-1c8546d6ce75",
    });

    const cars = await listAvailableCarsUseCase.execute({ name: car.brand });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by categoryId", async () => {
    const car = await inMemoryCarRepository.create({
      name: "Audi e-Tron GT",
      description: "German luxury vehicle.",
      dailyRate: 140,
      licensePlate: "HGF-7777",
      fineAmount: 100,
      brand: "Audi",
      categoryId: "7b064163-6909-49ac-a066-1c8546d6ce75",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: car.categoryId,
    });

    expect(cars).toEqual([car]);
  });
});
