import z from 'zod';

export const loginSchema = z.object({
  loginId: z.string().min(1, { message: 'Login ID is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export type LoginForm = z.infer<typeof loginSchema>;

export const loginResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;
