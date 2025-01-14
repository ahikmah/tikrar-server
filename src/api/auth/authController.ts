import type { Request, RequestHandler, Response } from "express";

import { tx } from "@/common/config/dbConfig";
import bcrypt from "bcrypt";

import { authService } from "@/api/auth/authService";
import { googleOAuth2Url } from "@/common/config/oAuthConfig";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

class AuthController {
  public createUser: RequestHandler = async (req: Request, res: Response) => {
    const payload = req.body;

    payload.password = await bcrypt.hash(payload.password, 10);

    tx(async (db: any) => {
      const serviceResponse = await authService.create(payload, db);
      return handleServiceResponse(serviceResponse, res);
    }, res);
  };

  public oAuthRedirect: RequestHandler = async (_req: Request, res: Response) => {
    res.redirect(googleOAuth2Url);
  };

  public oAuthLogin: RequestHandler = async (req: Request, res: Response) => {
    // handle oAuth login
  };
}

export const authController = new AuthController();
