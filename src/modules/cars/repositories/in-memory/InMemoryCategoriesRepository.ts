import { Category } from "@modules/cars/entities/Category";

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

class InMemoryCategoriesRepository implements ICategoriesRepository {
  private categories: Category[] = [];

  async create({ name, description }: ICreateCategoryDTO) {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
    });

    this.categories.push(category);
  }

  async list() {
    return this.categories;
  }

  async findByName(name: string) {
    const category = this.categories.find((category) => category.name === name);

    return category;
  }
}

export { InMemoryCategoriesRepository };
