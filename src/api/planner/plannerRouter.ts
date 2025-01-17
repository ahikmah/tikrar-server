import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { plannerController } from "@/api/planner/plannerController";
import { PlannerSchema } from "@/api/planner/plannerModel";

export const plannerRegistry = new OpenAPIRegistry();
export const plannerRouter: Router = express.Router();

plannerRegistry.register("Planner", PlannerSchema);

plannerRegistry.registerPath({
  method: "get",
  path: "/planner",
  tags: ["Planner"],
  responses: createApiResponse(z.array(PlannerSchema), "Success"),
});

plannerRouter.get("/", plannerController.getPlanner);
