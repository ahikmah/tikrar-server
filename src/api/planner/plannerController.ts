import type { Request, RequestHandler, Response } from "express";

import { plannerService } from "@/api/planner/plannerService";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

class PlannerController {
  public getPlanner: RequestHandler = async (_req: Request, res: Response) => {
    const serviceResponse = await plannerService.findAll();
    return handleServiceResponse(serviceResponse, res);
  };
}

export const plannerController = new PlannerController();
