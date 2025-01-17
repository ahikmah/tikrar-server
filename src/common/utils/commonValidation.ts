import { z } from "zod";

export const commonValidations = {
  id: z.string().uuid().optional(),
  name: z.string(),
  email: z.string().email(),
  password: z.string().optional(),
  avatar: z.string().url().optional(),
  planId: z.string().uuid().optional(),
  // ... other common validations
};
