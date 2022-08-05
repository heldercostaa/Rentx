import { Router } from "express";

import { CreateRentalController } from "@modules/rental/useCases/createRental/CreateRentalController";
import { ListRentalsByUserController } from "@modules/rental/useCases/listRentalsByUser/ListRentalsByUserController";
import { ReturnCarController } from "@modules/rental/useCases/returnCar/ReturnCarController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const returnCarController = new ReturnCarController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle);

rentalRoutes.post(
  "/return/:id",
  ensureAuthenticated,
  returnCarController.handle
);

rentalRoutes.get(
  "/user",
  ensureAuthenticated,
  listRentalsByUserController.handle
);

export { rentalRoutes };
