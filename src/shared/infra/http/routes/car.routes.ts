import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateCarController } from "@modules/car/useCases/createCar/CreateCarController";
import { ListAvailableCarsController } from "@modules/car/useCases/listAvailableCars/ListAvailableCarsController";
import { SetCarSpecificationController } from "@modules/car/useCases/setCarSpecification/SetCarSpecificationController";
import { UploadCarImagesController } from "@modules/car/useCases/uploadCarImages/UploadCarImagesController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carRoutes = Router();

const uploadCarImages = multer(uploadConfig.upload("./tmp/cars"));

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const setCarSpecificationController = new SetCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

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

carRoutes.post(
  "/images/:id",
  ensureAuthenticated,
  ensureAdmin,
  uploadCarImages.array("files"),
  uploadCarImagesController.handle
);

export { carRoutes };
