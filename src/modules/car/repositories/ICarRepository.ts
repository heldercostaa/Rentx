import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { IFindAvailableDTO } from "../dtos/IFindAvailableDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarRepository {
  create(params: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(licensePlate: string): Promise<Car>;
  findAvailable(params: IFindAvailableDTO): Promise<Car[]>;
}

export { ICarRepository };
