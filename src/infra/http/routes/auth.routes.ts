import type { FastifyInstance } from 'fastify';
import { AuthenticateUserUseCase } from '../../../app/use-cases/auth-user.useCase.js';
import { TypeOrmUserRepository } from '../../database/typeorm/repositories/user.repository.js';

export async function authRoutes(app: FastifyInstance) {
	app.post('/sessions', async (request, reply) => {
		try {
			const userRepository = new TypeOrmUserRepository();
			const authenticateUserUseCase = new AuthenticateUserUseCase(
				userRepository,
			);

			const { email, password } = request.body as {
				email: string;
				password: string;
			};

			const output = await authenticateUserUseCase.execute({ email, password });

			return reply.status(200).send(output);
		} catch (error) {
			if (error instanceof Error && error.message.includes('Invalid')) {
				return reply.status(401).send({ message: error.message });
			}

			return reply.status(500).send({ message: 'Internal Server Error' });
		}
	});
}
