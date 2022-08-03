import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "@modules/car/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/car/useCases/importCategory/ImportCategoryController";
import { ListCategoryController } from "@modules/car/useCases/listCategories/ListCategoryController";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoryController();

categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  importCategoryController.handle
);

export { categoriesRoutes };
