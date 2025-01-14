import type { Response } from "express";

import { StatusCodes } from "http-status-codes";
import { Pool } from "pg";

import { ServiceResponse } from "@/common/models/serviceResponse";
import { env } from "@/common/utils/envConfig";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

const dbConfig = {
  user: env.DB_USER,
  host: env.DB_HOST,
  database: env.DB_NAME,
  password: env.DB_PASSWORD,
  port: env.DB_PORT,
};

const pool = new Pool(dbConfig);

const tx = (callback: any, res: Response) => {
  pool.connect().then(async (client: any) => {
    try {
      await client.query(`set TIMEZONE = 'Asia/Bangkok'`);
      await client.query("BEGIN");
      await callback(client);
      await client.query("COMMIT");
      client.release();
    } catch (err: any) {
      await client.query("ROLLBACK");
      client.release();
      console.log(err.stack);
      const response = ServiceResponse.failure("Transaction failed", null, StatusCodes.INTERNAL_SERVER_ERROR);
      return handleServiceResponse(response, res);
    }
  });
};

export { pool, tx };
