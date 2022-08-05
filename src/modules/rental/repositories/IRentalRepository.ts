import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { Rental } from "../infra/typeorm/entities/Rental";

interface IRentalRepository {
  create({
    id,
    userId,
    carId,
    expectedReturnDate,
    endDate,
    total,
  }: ICreateRentalDTO): Promise<Rental>;

  findOpenByCarId(carId: string): Promise<Rental>;

  findOpenByUserId(userId: string): Promise<Rental>;

  findById(id: string): Promise<Rental>;
}

export { IRentalRepository };
