import type { Request, RequestHandler, Response } from "express";

import { userService } from "@/api/user/userService";
import { tx } from "@/common/config/dbConfig";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

class UserController {
  public getUsers: RequestHandler = async (_req: Request, res: Response) => {
    const serviceResponse = await userService.findAll();
    return handleServiceResponse(serviceResponse, res);
  };

  public getUser: RequestHandler = async (req: Request, res: Response) => {
    const id = req.params.id;
    const serviceResponse = await userService.findById(id);
    return handleServiceResponse(serviceResponse, res);
  };

  public deleteUser: RequestHandler = async (req: Request, res: Response) => {
    const id = req.params.id;
    tx(async (db: any) => {
      const serviceResponse = await userService.delete(id, db);
      return handleServiceResponse(serviceResponse, res);
    }, res);
  };
}

export const userController = new UserController();
