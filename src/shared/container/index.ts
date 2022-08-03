import { container } from "tsyringe";

import { UserRepository } from "@modules/account/infra/typeorm/repositories/UserRepository";
import { IUserRepository } from "@modules/account/repositories/IUserRepository";
import { CarRepository } from "@modules/car/infra/typeorm/repositories/CarRepository";
import { CategoryRepository } from "@modules/car/infra/typeorm/repositories/CategoryRepository";
import { SpecificationsRepository } from "@modules/car/infra/typeorm/repositories/SpecificationsRepository";
import { ICarRepository } from "@modules/car/repositories/ICarRepository";
import { ICategoryRepository } from "@modules/car/repositories/ICategoryRepository";
import { ISpecificationsRepository } from "@modules/car/repositories/ISpecificationsRepository";

container.registerSingleton<ICategoryRepository>(
  "CategoryRepository",
  CategoryRepository
);

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);

container.registerSingleton<ICarRepository>("CarRepository", CarRepository);
