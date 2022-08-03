import { getRepository, Repository } from "typeorm";

import { ICreateSpecificationDTO } from "@modules/car/dtos/ICreateSpecificationDTO";
import { Specification } from "@modules/car/infra/typeorm/entities/Specification";
import { ISpecificationRepository } from "@modules/car/repositories/ISpecificationRepository";

class SpecificationRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO) {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);

    return specification;
  }

  async findByName(name: string) {
    const specification = await this.repository.findOne({ name });

    return specification;
  }
}

export { SpecificationRepository };
