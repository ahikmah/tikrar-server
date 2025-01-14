import type { Auth } from "@/api/auth/authModel";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

import { ServiceResponse } from "@/common/models/serviceResponse";
import { env } from "@/common/utils/envConfig";
import { logger } from "@/server";

export class AuthService {
  // Creates a new user in the database
  async create(data: Auth, db: any): Promise<ServiceResponse<Auth | null>> {
    try {
      const user = await db.query(
        `INSERT INTO master."user" ("name", "email", "password", "planId")
                 VALUES ($1, $2, $3, $4) RETURNING *`,
        [data.name, data.email, data.password, data.planId],
      );

      if (!user) {
        return ServiceResponse.failure("User not created", null, StatusCodes.INTERNAL_SERVER_ERROR);
      }

      // generate token
      const token = jwt.sign({ id: user.id }, env.JWT_SECRET, {
        expiresIn: env.JWT_EXPIRES_IN,
      });

      return ServiceResponse.success<Auth>("User created", {
        ...user.rows[0],
        token: token,
      });
    } catch (ex) {
      const errorMessage = `Error creating user: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure("An error occurred while creating user.", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}

export const authService = new AuthService();
