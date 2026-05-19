import { z } from 'zod';

export const registrationValidationSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: 'Name must be at least 2 characters' })
      .max(50, { message: 'Name must be less than 50 characters' }),
    email: z.string().email({ message: 'Invalid email format' }),

    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter',
      })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter',
      })
      .regex(/[0-9]/, {
        message: 'Password must contain at least one number',
      })
      .regex(/[@$!%*?&]/, {
        message:
          'Password must contain at least one special character (@$!%*?&)',
      }),

    confirmPassword: z.string().min(8, {
      message: 'Confirm password must be at least 8 characters',
    }),
  })
  .refine(
    (data: { password: string; confirmPassword: string }) =>
      data.password === data.confirmPassword,
    {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    },
  );
