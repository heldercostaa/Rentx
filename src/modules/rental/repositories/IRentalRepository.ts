import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { Rental } from "../infra/typeorm/entities/Rental";

interface IRentalRepository {
  create({
    userId,
    carId,
    expectedReturnDate,
  }: ICreateRentalDTO): Promise<Rental>;

  findOpenByCarId(carId: string): Promise<Rental>;

  findOpenByUserId(userId: string): Promise<Rental>;
}

export { IRentalRepository };
