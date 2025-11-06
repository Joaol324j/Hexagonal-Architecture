import type { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserDto } from '../dtos/user.dto.js';
import { TypeOrmUserRepository } from '../../database/typeorm/repositories/user.repository.js';
import { CreateUserUseCase } from '../../../app/use-cases/create-user.use-case.js';
import { ZodError } from 'zod';

export class UserController {
	async create(request: FastifyRequest, reply: FastifyReply) {
		try {
			const parsedData = CreateUserDto.parse(request.body);
			const userRepository = new TypeOrmUserRepository();
			const createUserUseCase = new CreateUserUseCase(userRepository);

			const output = await createUserUseCase.execute(parsedData);
			return reply.status(201).send(output);
		} catch (error) {
			if (error instanceof ZodError) {
				return reply.status(400).send({
					message: 'Validation error',
					errors: error.flatten(),
				});
			}

			if (error instanceof Error) {
				const statusCode = error.message.includes('already registered')
					? 409
					: 400;

				return reply.status(statusCode).send({
					message: error.message,
				});
			}

			return reply.status(500).send({
				message: 'Internal server error',
			});
		}
	}
}
