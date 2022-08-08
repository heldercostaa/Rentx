import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { carRoutes } from "./car.routes";
import { categoryRoutes } from "./category.routes";
import { passwordRoutes } from "./password.routes";
import { rentalRoutes } from "./rental.routes";
import { specificationRoutes } from "./specification.routes";
import { userRoutes } from "./user.routes";

const router = Router();

router.use("/category", categoryRoutes);
router.use("/specification", specificationRoutes);
router.use("/user", userRoutes);
router.use("/car", carRoutes);
router.use("/rental", rentalRoutes);
router.use("/", passwordRoutes);
router.use(authenticateRoutes);

export { router };
