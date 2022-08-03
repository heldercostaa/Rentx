import { container } from "tsyringe";

import { UserRepository } from "@modules/account/infra/typeorm/repositories/UserRepository";
import { IUserRepository } from "@modules/account/repositories/IUserRepository";
import { CarRepository } from "@modules/car/infra/typeorm/repositories/CarRepository";
import { CategoriesRepository } from "@modules/car/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationsRepository } from "@modules/car/infra/typeorm/repositories/SpecificationsRepository";
import { ICarRepository } from "@modules/car/repositories/ICarRepository";
import { ICategoriesRepository } from "@modules/car/repositories/ICategoriesRepository";
import { ISpecificationsRepository } from "@modules/car/repositories/ISpecificationsRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);

container.registerSingleton<ICarRepository>("CarRepository", CarRepository);
