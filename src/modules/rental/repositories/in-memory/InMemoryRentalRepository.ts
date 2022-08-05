import { ICreateRentalDTO } from "@modules/rental/dtos/ICreateRentalDTO";
import { IRentalRepository } from "@modules/rental/repositories/IRentalRepository";

import { Rental } from "../../infra/typeorm/entities/Rental";

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

  async create({
    id,
    userId,
    carId,
    expectedReturnDate,
    total,
    endDate,
  }: ICreateRentalDTO) {
    const rental = new Rental();

    if (id) rental.id = id;
    rental.userId = userId;
    rental.carId = carId;
    rental.expectedReturnDate = expectedReturnDate;
    rental.startDate = new Date();
    if (total) rental.total = total;
    if (endDate) rental.endDate = endDate;

    this.rentals.push(rental);

    return rental;
  }

  async findById(id: string) {
    return this.rentals.find((rental) => rental.id === id);
  }

  async findByUserId(userId: string) {
    return this.rentals.filter((rental) => rental.userId === userId);
  }
}

export { InMemoryRentalRepository };
