import { IRentalRepository } from "@modules/rental/repositories/IRentalRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  userId: string;
  carId: string;
  expectedReturnDate: Date;
}

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

    const rental = await this.rentalRepository.create({
      userId,
      carId,
      expectedReturnDate,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
