import type { Planner } from "@/api/planner/plannerModel";

import { StatusCodes } from "http-status-codes";

import { pool as db } from "@/common/config/dbConfig";
import { ServiceResponse } from "@/common/models/serviceResponse";

import { logger } from "@/server";

export class PlannerService {
  // get all planner
  async findAll(): Promise<ServiceResponse<Planner[] | null>> {
    try {
      const planner = await db.query(`SELECT *
                                            FROM master."plan"`);
      if (!planner) {
        return ServiceResponse.failure("No planner found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<Planner[]>("Planner found", planner.rows);
    } catch (ex) {
      const errorMessage = `Error finding all planner: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving planner.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export const plannerService = new PlannerService();
