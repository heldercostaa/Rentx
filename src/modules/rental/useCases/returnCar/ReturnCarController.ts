import { Request, Response } from "express";
import { container } from "tsyringe";

import { ReturnCarUseCase } from "./ReturnCarUseCase";

class ReturnCarController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { id: userId } = request.user;

    const returnCarUseCase = container.resolve(ReturnCarUseCase);

    const rental = await returnCarUseCase.execute({ id, userId });

    return response.status(200).json(rental);
  }
}

export { ReturnCarController };
