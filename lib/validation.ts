import * as z from 'zod';

export const LoginFormSchema = z.object({
    userName: z.string().min(3, {
        message: 'User name must be at least 3 characters long',
    }),
    password: z.string().min(8, {
        message: 'Password must be at least 8 characters long',
    }),
});