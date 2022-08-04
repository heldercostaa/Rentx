import { Router } from "express";

import { CreateCarController } from "@modules/car/useCases/createCar/CreateCarController";
import { ListAvailableCarsController } from "@modules/car/useCases/listAvailableCars/ListAvailableCarsController";
import { SetCarSpecificationController } from "@modules/car/useCases/setCarSpecification/SetCarSpecificationController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const setCarSpecificationController = new SetCarSpecificationController();

carRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carRoutes.post(
  "/specification/:id",
  ensureAuthenticated,
  ensureAdmin,
  setCarSpecificationController.handle
);

carRoutes.get("/available", listAvailableCarsController.handle);

export { carRoutes };
