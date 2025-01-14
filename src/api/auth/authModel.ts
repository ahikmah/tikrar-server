import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export type Auth = z.infer<typeof AuthSchema>;
export const AuthSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().optional(),
  avatar: z.string().url(),
  planId: z.string().uuid(),
});
