import { Router } from "express";

import { CreateRentalController } from "@modules/rental/useCases/createRental/CreateRentalController";
import { ReturnCarController } from "@modules/rental/useCases/returnCar/ReturnCarController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const returnCarController = new ReturnCarController();

rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle);
rentalRoutes.post(
  "/return/:id",
  ensureAuthenticated,
  returnCarController.handle
);

export { rentalRoutes };
