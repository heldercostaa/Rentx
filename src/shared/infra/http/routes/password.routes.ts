import { Router } from "express";

import { ResetUserPasswordController } from "@modules/account/useCases/resetUserPassword/ResetUserPasswordController";
import { SendForgotPasswordMailController } from "@modules/account/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetUserPasswordController = new ResetUserPasswordController();

passwordRoutes.post(
  "/forgot-password",
  sendForgotPasswordMailController.handle
);

passwordRoutes.post("/reset-password", resetUserPasswordController.handle);

export { passwordRoutes };
