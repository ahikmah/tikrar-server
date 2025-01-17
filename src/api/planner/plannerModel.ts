import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export type Planner = z.infer<typeof PlannerSchema>;

export const PlannerSchema = z.object({
  id: z.string().uuid(),
  pagePerDay: z.number(),
  isActive: z.boolean(),
});
