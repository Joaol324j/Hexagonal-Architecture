import { z } from 'zod';

export const CreateUserDto = z.object({
	name: z.string().min(2, 'Name must have at least 2 characters'),
	email: z.string().email('Invalid email address'),
	password: z.string().min(6, 'Password must have at least 6 characters'),
});

export type CreateUserDto = z.infer<typeof CreateUserDto>;
