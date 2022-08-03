import { ICreateSpecificationDTO } from "../dtos/ICreateSpecificationDTO";
import { Specification } from "../infra/typeorm/entities/Specification";

interface ISpecificationRepository {
  create(params: ICreateSpecificationDTO): Promise<Specification>;
  findByName(name: string): Promise<Specification>;
}

export { ISpecificationRepository };
