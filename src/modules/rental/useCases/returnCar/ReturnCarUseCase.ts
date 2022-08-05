import { inject, injectable } from "tsyringe";

import { ICarRepository } from "@modules/car/repositories/ICarRepository";
import { IRentalRepository } from "@modules/rental/repositories/IRentalRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  id: string;
  userId: string;
}

@injectable()
class ReturnCarUseCase {
  constructor(
    @inject("RentalRepository")
    private rentalRepository: IRentalRepository,

    @inject("CarRepository")
    private carRepository: ICarRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ id, userId }: IRequest) {
    const rental = await this.rentalRepository.findById(id);

    const MINIMUM_RENT_DAYS = 1;

    if (!rental) {
      throw new AppError("Rental does not exist");
    }

    const car = await this.carRepository.findById(rental.carId);

    let daily = this.dateProvider.compareInDays(rental.startDate, new Date());

    if (daily <= 0) {
      daily = MINIMUM_RENT_DAYS;
    }

    const delayDays = this.dateProvider.compareInDays(
      new Date(),
      rental.expectedReturnDate
    );

    let totalCost = 0;

    if (delayDays > 0) {
      const fine = delayDays * car.fineAmount;
      totalCost += fine;
    }

    totalCost += daily * car.dailyRate;

    rental.endDate = new Date();
    rental.total = totalCost;

    await this.rentalRepository.create(rental);
    await this.carRepository.updateAvailable({ id: car.id, available: true });

    return rental;
  }
}

export { ReturnCarUseCase };
