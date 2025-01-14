import type { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

import { env } from "@/common/utils/envConfig";

export const authenticate = (req: any, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).send({ error: "Please authenticate" });
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate" });
  }
};
