import { z } from 'zod';

export const AdminSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type Admin = z.infer<typeof AdminSchema>;
