import type { Request, RequestHandler, Response } from "express";

import { tx } from "@/common/config/dbConfig";
import bcrypt from "bcrypt";

import { userService } from "@/api/user/userService";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

class UserController {
  public createUser: RequestHandler = async (req: Request, res: Response) => {
    const payload = req.body;

    const newPassword = await bcrypt.hash(payload.password, 10);
    payload.password = newPassword;

    tx(async (db: any) => {
      const serviceResponse = await userService.create(payload, db);
      return handleServiceResponse(serviceResponse, res);
    }, res);
  };

  public getUsers: RequestHandler = async (_req: Request, res: Response) => {
    const serviceResponse = await userService.findAll();
    return handleServiceResponse(serviceResponse, res);
  };

  public getUser: RequestHandler = async (req: Request, res: Response) => {
    const id = req.params.id;
    const serviceResponse = await userService.findById(id);
    return handleServiceResponse(serviceResponse, res);
  };
}

export const userController = new UserController();
