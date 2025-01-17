import type { Request, RequestHandler, Response } from "express";

import bcrypt from "bcrypt";
import { google } from "googleapis";
import { StatusCodes } from "http-status-codes";

import { authService } from "@/api/auth/authService";
import { tx } from "@/common/config/dbConfig";
import { googleOAuth2Client, googleOAuth2Url } from "@/common/config/oAuthConfig";
import { generateToken } from "@/common/middleware/authentication";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

class AuthController {
  public registerUser: RequestHandler = async (req: Request, res: Response) => {
    const payload = req.body;

    // check if email already exists
    const checkResponse = await authService.findByEmail(payload.email);
    if ("isExist" in checkResponse) {
      if (checkResponse.isExist) {
        const response = ServiceResponse.failure("Email already exists", null, StatusCodes.CONFLICT);
        return handleServiceResponse(response, res);
      }
    }

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
    const { code } = req.query;

    const { tokens } = await googleOAuth2Client.getToken(code as string);

    googleOAuth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
      auth: googleOAuth2Client,
      version: "v2",
    });

    const { data } = await oauth2.userinfo.get();

    if (!data.email || !data.name) {
      const response = ServiceResponse.failure(
        "Required fields missing in google response",
        null,
        StatusCodes.BAD_REQUEST,
      );
      return handleServiceResponse(response, res);
    }

    // check if user exists in db
    const checkResponse = await authService.findByEmail(data.email);

    if ("isExist" in checkResponse) {
      if (!checkResponse.isExist) {
        const payload = {
          name: data.name,
          email: data.email,
          avatar: data.picture as string,
        };

        tx(async (db: any) => {
          const serviceResponse = await authService.create(payload, db);
          const token = generateToken({ id: serviceResponse?.responseObject?.id });
          return res.redirect(`https://tikrar-journal.vercel.app?token=${token}`);
        }, res);
      } else {
        const token = generateToken({ id: checkResponse?.data?.id });
        return res.redirect(`https://tikrar-journal.vercel.app?token=${token}`);
      }
    }
  };
}

export const authController = new AuthController();
