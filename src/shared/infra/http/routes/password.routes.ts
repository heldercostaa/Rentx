import { Router } from "express";

import { SendForgotPasswordMailController } from "@modules/account/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();

passwordRoutes.post(
  "/forgot-password",
  sendForgotPasswordMailController.handle
);

export { passwordRoutes };
