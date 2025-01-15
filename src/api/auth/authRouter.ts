import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { AuthSchema } from "@/api/auth/authModel";
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

authRouter.post("/register", authController.createUser);

// Google OAuth2 URL
authRouter.get("/google", authController.oAuthRedirect);

authRouter.get("/google/callback", authController.oAuthLogin);
