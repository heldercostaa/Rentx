import dayjs from "dayjs";

import { InMemoryRentalRepository } from "@modules/rental/infra/typeorm/repositories/in-memory/InMemoryRentalRepository";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let inMemoryRentalRepository: InMemoryRentalRepository;

describe("Create Rental", () => {
  const nowPlus1Day = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    inMemoryRentalRepository = new InMemoryRentalRepository();
    createRentalUseCase = new CreateRentalUseCase(inMemoryRentalRepository);
  });

  it("should be able to create a rental", async () => {
    const rental = await createRentalUseCase.execute({
      carId: "d961210f-ff68-4edc-adfe-22b48c1a065a",
      userId: "afbc032b-3796-46b4-baaf-115e208f398e",
      expectedReturnDate: nowPlus1Day,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("startDate");
  });

  it("should not be able to create a rental if car is already rented", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        carId: "d961210f-ff68-4edc-adfe-22b48c1a065a",
        userId: "64fc94f4-359f-4664-8ddd-1d3e4a326b0b",
        expectedReturnDate: nowPlus1Day,
      });

      await createRentalUseCase.execute({
        carId: "d961210f-ff68-4edc-adfe-22b48c1a065a",
        userId: "afbc032b-3796-46b4-baaf-115e208f398e",
        expectedReturnDate: nowPlus1Day,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a rental if user already has another open rental", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        carId: "18b300b8-b2a2-4167-8651-4858f0a92377",
        userId: "afbc032b-3796-46b4-baaf-115e208f398e",
        expectedReturnDate: nowPlus1Day,
      });

      await createRentalUseCase.execute({
        carId: "d961210f-ff68-4edc-adfe-22b48c1a065a",
        userId: "afbc032b-3796-46b4-baaf-115e208f398e",
        expectedReturnDate: nowPlus1Day,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a rental with rental time less than 24 hour", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        carId: "18b300b8-b2a2-4167-8651-4858f0a92377",
        userId: "afbc032b-3796-46b4-baaf-115e208f398e",
        expectedReturnDate: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
