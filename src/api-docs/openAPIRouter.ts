import path from "node:path";
import express, { type Request, type Response, type Router } from "express";
import swaggerUi from "swagger-ui-express";

import { generateOpenAPIDocument } from "@/api-docs/openAPIDocumentGenerator";

export const openAPIRouter: Router = express.Router();
const openAPIDocument = generateOpenAPIDocument();

openAPIRouter.get("/swagger.json", (_req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  res.send(openAPIDocument);
});

// Serve Swagger UI static files
openAPIRouter.use("/swagger-ui", express.static(path.join(__dirname, "../../node_modules/swagger-ui-dist")));

openAPIRouter.use("/", swaggerUi.serve, swaggerUi.setup(openAPIDocument, { explorer: true }));
