import { Request, Response } from "express";
import { container } from "tsyringe";

import { SetCarSpecificationUseCase } from "./SetCarSpecificationUseCase";

class SetCarSpecificationController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { specificationIds } = request.body;

    const setCarSpecificationUseCase = container.resolve(
      SetCarSpecificationUseCase
    );

    const cars = await setCarSpecificationUseCase.execute({
      carId: id,
      specificationIds,
    });

    return response.json(cars);
  }
}

export { SetCarSpecificationController };
