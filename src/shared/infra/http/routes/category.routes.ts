import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "@modules/car/useCases/createCategory/CreateCategoryController";
import { ImportCategoriesController } from "@modules/car/useCases/importCategory/ImportCategoriesController";
import { ListCategoriesController } from "@modules/car/useCases/listCategories/ListCategoriesController";

const categoryRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const importCategoriesController = new ImportCategoriesController();
const listCategoriesController = new ListCategoriesController();

categoryRoutes.post("/", createCategoryController.handle);

categoryRoutes.get("/", listCategoriesController.handle);

categoryRoutes.post(
  "/import",
  upload.single("file"),
  importCategoriesController.handle
);

export { categoryRoutes };
