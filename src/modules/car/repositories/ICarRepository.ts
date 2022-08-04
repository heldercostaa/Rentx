import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { IFindAvailableDTO } from "../dtos/IFindAvailableDTO";
import { IUpdateAvailableDTO } from "../dtos/IUpdateAvailableDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarRepository {
  create({
    id,
    name,
    brand,
    dailyRate,
    description,
    fineAmount,
    licensePlate,
    categoryId,
    specifications,
  }: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(licensePlate: string): Promise<Car>;

  findAvailable({ name, brand, categoryId }: IFindAvailableDTO): Promise<Car[]>;

  findById(id: string): Promise<Car>;

  updateAvailable({ id, available }: IUpdateAvailableDTO): Promise<void>;
}

export { ICarRepository };
