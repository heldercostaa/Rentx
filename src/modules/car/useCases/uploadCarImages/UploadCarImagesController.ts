import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase";

interface IFiles {
  filename: string;
}

class UploadCarImagesController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const files = request.files as IFiles[];

    const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase);

    const imageNames = files.map((file) => file.filename);

    await uploadCarImagesUseCase.execute({ carId: id, imageNames });

    return response.status(201).send();
  }
}

export { UploadCarImagesController };
