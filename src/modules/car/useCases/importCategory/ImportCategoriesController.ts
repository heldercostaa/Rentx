import { Request, Response } from "express";
import { container } from "tsyringe";

import { ImportCategoriesUseCase } from "./ImportCategoriesUseCase";

class ImportCategoriesController {
  async handle(request: Request, response: Response) {
    const importCategoriesUseCase = container.resolve(ImportCategoriesUseCase);

    const { file } = request;

    await importCategoriesUseCase.execute(file);

    return response.sendStatus(201);
  }
}

export { ImportCategoriesController };
