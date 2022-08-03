import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { carRoutes } from "./car.routes";
import { categoryRoutes } from "./category.routes";
import { specificationsRoutes } from "./specifications.routes";
import { userRoutes } from "./user.routes";

const router = Router();

router.use("/category", categoryRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/user", userRoutes);
router.use("/car", carRoutes);
router.use(authenticateRoutes);

export { router };
