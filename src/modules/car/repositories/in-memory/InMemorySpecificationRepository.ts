import { ICreateSpecificationDTO } from "@modules/car/dtos/ICreateSpecificationDTO";
import { Specification } from "@modules/car/infra/typeorm/entities/Specification";

import { ISpecificationRepository } from "../ISpecificationRepository";

class InMemorySpecificationRepository implements ISpecificationRepository {
  private specifications: Specification[] = [];

  async create({ name, description }: ICreateSpecificationDTO) {
    const specification = new Specification();

    specification.name = name;
    specification.description = description;

    this.specifications.push(specification);

    return specification;
  }

  async findByName(name: string) {
    return this.specifications.find(
      (specification) => specification.name === name
    );
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.specifications.filter((specification) =>
      ids.includes(specification.id)
    );
  }
}

export { InMemorySpecificationRepository };
