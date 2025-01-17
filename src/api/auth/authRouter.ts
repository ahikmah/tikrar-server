import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { AuthSchema, GetAuthSchema, GetLoginSchema } from "@/api/auth/authModel";
import { validateRequest } from "@/common/utils/httpHandlers";
import { authController } from "./authController";

export const authRegistry = new OpenAPIRegistry();
export const authRouter: Router = express.Router();

authRegistry.register("Auth", AuthSchema);

// register new user
authRegistry.registerPath({
  method: "post",
  path: "/auth",
  tags: ["Auth"],
  responses: createApiResponse(AuthSchema, "Success"),
});

authRouter.post("/register", validateRequest(GetAuthSchema), authController.registerUser);

// login
authRegistry.registerPath({
  method: "post",
  path: "/auth/login",
  tags: ["Auth"],
  responses: createApiResponse(AuthSchema, "Success"),
});

authRouter.post("/login", validateRequest(GetLoginSchema), authController.loginUser);

// Google OAuth2 URL
authRouter.get("/google/callback", authController.oAuthLogin);
authRouter.get("/google", authController.oAuthRedirect);
