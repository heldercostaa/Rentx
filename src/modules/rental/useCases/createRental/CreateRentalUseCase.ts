import { inject, injectable } from "tsyringe";

import { IRentalRepository } from "@modules/rental/repositories/IRentalRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  userId: string;
  carId: string;
  expectedReturnDate: Date;
}

const MINIMUM_RENT_HOURS = 24;

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalRepository")
    private rentalRepository: IRentalRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ userId, carId, expectedReturnDate }: IRequest) {
    const isCarRented = await this.rentalRepository.findOpenByCarId(carId);

    if (isCarRented) {
      throw new AppError("Car is not available to rent");
    }

    const isUserRenting = await this.rentalRepository.findOpenByUserId(userId);

    if (isUserRenting) {
      throw new AppError("There is already a rental in progress for this user");
    }

    const timeDifference = this.dateProvider.compareInHours(
      new Date(),
      expectedReturnDate
    );

    if (timeDifference < MINIMUM_RENT_HOURS) {
      throw new AppError("Rental time should be at least 24 hours");
    }

    const rental = await this.rentalRepository.create({
      userId,
      carId,
      expectedReturnDate,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
