import type { Auth } from "@/api/auth/authModel";
import type { User } from "@/api/user/userModel";
import { StatusCodes } from "http-status-codes";

import { pool as db } from "@/common/config/dbConfig";
import { ServiceResponse } from "@/common/models/serviceResponse";

import { generateToken } from "@/common/middleware/authentication";
import { logger } from "@/server";

export class AuthService {
  // Creates a new user in the database
  async create(data: Auth, db: any): Promise<ServiceResponse<Auth | null>> {
    try {
      const user = await db.query(
        `INSERT INTO master."user" ("name", "email", "avatar","password", "planId")
                 VALUES ($1, $2, $3, $4, $5)
                 RETURNING *`,
        [data.name, data.email, data.avatar, data.password, data.planId],
      );

      if (!user) {
        return ServiceResponse.failure("User not created", null, StatusCodes.INTERNAL_SERVER_ERROR);
      }

      const token = generateToken({ id: user.id });

      return ServiceResponse.success<Auth>("User created", { ...user.rows[0], token });
    } catch (ex) {
      const errorMessage = `Error creating user: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure("An error occurred while creating user.", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  // Check if user exists in db
  async findByEmail(email: string): Promise<
    | {
        isExist: boolean;
        data: User | null;
      }
    | ServiceResponse<Auth | null>
  > {
    try {
      const user = await db.query(`SELECT * FROM master."user" WHERE email = $1`, [email]);

      if (user.rows.length === 0) {
        return {
          isExist: false,
          data: null,
        };
      }

      return { isExist: true, data: user.rows[0] };
    } catch (ex) {
      const errorMessage = `Error finding user by email: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure("An error occurred while finding user.", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}

export const authService = new AuthService();
