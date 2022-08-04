import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

class CreateRentalController {
  async handle(request: Request, response: Response) {
    const { id } = request.user;
    const { carId, expectedReturnDate } = request.body;

    const createRentalUseCase = container.resolve(CreateRentalUseCase);

    const rental = await createRentalUseCase.execute({
      userId: id,
      carId,
      expectedReturnDate,
    });

    return response.status(201).json(rental);
  }
}

export { CreateRentalController };
