import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IRentalRepository } from "@modules/rental/repositories/IRentalRepository";
import { AppError } from "@shared/errors/AppError";

dayjs.extend(utc);

interface IRequest {
  userId: string;
  carId: string;
  expectedReturnDate: Date;
}

const MINIMUM_RENT_HOURS = 24;

class CreateRentalUseCase {
  constructor(private rentalRepository: IRentalRepository) {}

  async execute({ userId, carId, expectedReturnDate }: IRequest) {
    const isCarRented = await this.rentalRepository.findOpenByCarId(carId);

    if (isCarRented) {
      throw new AppError("Car is not available to rent");
    }

    const isUserRenting = await this.rentalRepository.findOpenByUserId(userId);

    if (isUserRenting) {
      throw new AppError("There is already a rental in progress for this user");
    }

    const expectedReturnDateFormatted = dayjs(expectedReturnDate)
      .utc()
      .local()
      .format();

    const nowFormatted = dayjs().utc().local().format();

    const compare = dayjs(expectedReturnDateFormatted).diff(
      nowFormatted,
      "hours"
    );

    if (compare < MINIMUM_RENT_HOURS) {
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
