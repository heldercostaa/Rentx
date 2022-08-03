import { Category } from "@modules/car/infra/typeorm/entities/Category";

import {
  ICategoryRepository,
  ICreateCategoryDTO,
} from "../ICategoryRepository";

class InMemoryCategoryRepository implements ICategoryRepository {
  private categories: Category[] = [];

  async create({ name, description }: ICreateCategoryDTO) {
    const category = new Category();

    category.name = name;
    category.description = description;

    this.categories.push(category);

    return category;
  }

  async list() {
    return this.categories;
  }

  async findByName(name: string) {
    const category = this.categories.find((category) => category.name === name);

    return category;
  }
}

export { InMemoryCategoryRepository };
