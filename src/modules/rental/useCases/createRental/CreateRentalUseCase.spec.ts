import dayjs from "dayjs";

import { InMemoryCarRepository } from "@modules/car/repositories/in-memory/InMemoryCarRepository";
import { InMemoryRentalRepository } from "@modules/rental/repositories/in-memory/InMemoryRentalRepository";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let inMemoryRentalRepository: InMemoryRentalRepository;
let inMemoryCarRepository: InMemoryCarRepository;
let dayJsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
  const nowPlus1Day = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    dayJsDateProvider = new DayjsDateProvider();
    inMemoryRentalRepository = new InMemoryRentalRepository();
    inMemoryCarRepository = new InMemoryCarRepository();

    createRentalUseCase = new CreateRentalUseCase(
      inMemoryRentalRepository,
      inMemoryCarRepository,
      dayJsDateProvider
    );
  });

  it("should be able to create a rental", async () => {
    const car = await inMemoryCarRepository.create({
      name: "RS e-tron GT",
      description: "German luxury vehicle.",
      dailyRate: 300,
      licensePlate: "HC-0000",
      fineAmount: 30,
      brand: "Audi",
      categoryId: "1a531bb7-51ae-439d-8abf-2ef7570385d9",
    });

    const rental = await createRentalUseCase.execute({
      carId: car.id,
      userId: "afbc032b-3796-46b4-baaf-115e208f398e",
      expectedReturnDate: nowPlus1Day,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("startDate");
  });

  it("should not be able to create a rental if car is already rented", async () => {
    await createRentalUseCase.execute({
      carId: "d961210f-ff68-4edc-adfe-22b48c1a065a",
      userId: "64fc94f4-359f-4664-8ddd-1d3e4a326b0b",
      expectedReturnDate: nowPlus1Day,
    });

    await expect(
      createRentalUseCase.execute({
        carId: "d961210f-ff68-4edc-adfe-22b48c1a065a",
        userId: "afbc032b-3796-46b4-baaf-115e208f398e",
        expectedReturnDate: nowPlus1Day,
      })
    ).rejects.toEqual(new AppError("Car is not available to rent"));
  });

  it("should not be able to create a rental if user already has another open rental", async () => {
    await createRentalUseCase.execute({
      carId: "18b300b8-b2a2-4167-8651-4858f0a92377",
      userId: "afbc032b-3796-46b4-baaf-115e208f398e",
      expectedReturnDate: nowPlus1Day,
    });
    await expect(
      createRentalUseCase.execute({
        carId: "d961210f-ff68-4edc-adfe-22b48c1a065a",
        userId: "afbc032b-3796-46b4-baaf-115e208f398e",
        expectedReturnDate: nowPlus1Day,
      })
    ).rejects.toEqual(
      new AppError("There is already a rental in progress for this user")
    );
  });

  it("should not be able to create a rental with rental time less than 24 hour", async () => {
    await expect(
      createRentalUseCase.execute({
        carId: "18b300b8-b2a2-4167-8651-4858f0a92377",
        userId: "afbc032b-3796-46b4-baaf-115e208f398e",
        expectedReturnDate: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Rental time should be at least 24 hours"));
  });
});
