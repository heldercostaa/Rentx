import { ICreateRentalDTO } from "@modules/rental/dtos/ICreateRentalDTO";
import { IRentalRepository } from "@modules/rental/repositories/IRentalRepository";

import { Rental } from "../../entities/Rental";

class InMemoryRentalRepository implements IRentalRepository {
  private rentals: Rental[] = [];

  async findOpenByCarId(carId: string) {
    return this.rentals.find(
      (rental) => rental.carId === carId && !rental.endDate
    );
  }

  async findOpenByUserId(userId: string) {
    return this.rentals.find(
      (rental) => rental.userId === userId && !rental.endDate
    );
  }

  async create({ userId, carId, expectedReturnDate }: ICreateRentalDTO) {
    const rental = new Rental();

    rental.userId = userId;
    rental.carId = carId;
    rental.expectedReturnDate = expectedReturnDate;
    rental.startDate = new Date();

    this.rentals.push(rental);

    return rental;
  }
}

export { InMemoryRentalRepository };
