import { Router } from "express";
import {
  loginUserSchema,
  registerUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from "../validations/authValidation.js";
import {
  loginUser,
  logoutUser,
  refreshUserSession,
  registerUser,
  requestResetEamil,
  resetPassword,
} from "../controllers/authController.js";
import { celebrate } from "celebrate";

const router = Router();

router.post("/auth/register", celebrate(registerUserSchema), registerUser);

router.post("/auth/login", celebrate(loginUserSchema), loginUser);

router.post("/auth/logout", logoutUser);

router.post("/auth/refresh", refreshUserSession);

router.post(
  "/auth/reset-Email",
  celebrate(requestResetEmailSchema),
  requestResetEamil,
);

router.post(
  "/auth/reset-password",
  celebrate(resetPasswordSchema),
  resetPassword,
);

export default router;
