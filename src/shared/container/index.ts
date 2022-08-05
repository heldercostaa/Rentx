import { container } from "tsyringe";

import "@shared/container/providers";

import { UserRepository } from "@modules/account/infra/typeorm/repositories/UserRepository";
import { UserTokenRepository } from "@modules/account/infra/typeorm/repositories/UserTokenRepository";
import { IUserRepository } from "@modules/account/repositories/IUserRepository";
import { IUserTokenRepository } from "@modules/account/repositories/IUserTokenRepository";
import { CarImageRepository } from "@modules/car/infra/typeorm/repositories/CarImageRepository";
import { CarRepository } from "@modules/car/infra/typeorm/repositories/CarRepository";
import { CategoryRepository } from "@modules/car/infra/typeorm/repositories/CategoryRepository";
import { SpecificationRepository } from "@modules/car/infra/typeorm/repositories/SpecificationRepository";
import { ICarImageRepository } from "@modules/car/repositories/ICarImageRepository";
import { ICarRepository } from "@modules/car/repositories/ICarRepository";
import { ICategoryRepository } from "@modules/car/repositories/ICategoryRepository";
import { ISpecificationRepository } from "@modules/car/repositories/ISpecificationRepository";
import { RentalRepository } from "@modules/rental/infra/typeorm/repositories/RentalRepository";
import { IRentalRepository } from "@modules/rental/repositories/IRentalRepository";

container.registerSingleton<ICategoryRepository>(
  "CategoryRepository",
  CategoryRepository
);

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
);

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);

container.registerSingleton<ICarRepository>("CarRepository", CarRepository);

container.registerSingleton<ICarImageRepository>(
  "CarImageRepository",
  CarImageRepository
);

container.registerSingleton<IRentalRepository>(
  "RentalRepository",
  RentalRepository
);

container.registerSingleton<IUserTokenRepository>(
  "UserTokenRepository",
  UserTokenRepository
);
