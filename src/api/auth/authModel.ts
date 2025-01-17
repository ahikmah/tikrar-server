import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { commonValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export type Auth = z.infer<typeof AuthSchema>;
export const AuthSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  email: z.string().email(),
  password: z.string().optional().nullable(),
  avatar: z.string().url().optional().nullable(),
  planId: z.string().uuid().optional().nullable(),
  createdAt: z.date().optional().nullable(),
  updatedAt: z.date().optional().nullable(),
  token: z.string().optional(),
});

export const GetAuthSchema = z.object({
  body: z.object({
    id: commonValidations.id,
    name: commonValidations.name,
    email: commonValidations.email,
    password: commonValidations.password,
    avatar: commonValidations.avatar,
    planId: commonValidations.planId,
  }),
});
