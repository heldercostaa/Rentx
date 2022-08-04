import { ICreateCarImageDTO } from "../dtos/ICreateCarImageDTO";
import { CarImage } from "../infra/typeorm/entities/CarImage";

interface ICarImageRepository {
  create({ carId, imageName }: ICreateCarImageDTO): Promise<CarImage>;
}

export { ICarImageRepository };
