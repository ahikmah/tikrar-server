import type { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

import { env } from "@/common/utils/envConfig";

export const authenticate = (req: any, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).send({ error: "Please authenticate" });
  }

  try {
    req.user = jwt.verify(token, env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

export const generateToken = (data: object) => {
  return jwt.sign(data, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
};
