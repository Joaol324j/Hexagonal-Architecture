import fastify from 'fastify';
import { ZodError } from 'zod';
import { userRoutes } from './routes/user.routes.js';

const app = fastify({
	logger: true,
});

app.register(userRoutes);

app.setErrorHandler((error, _request, reply) => {
	if (error instanceof ZodError) {
		return reply.status(400).send({
			message: 'Validation error',
			issues: error.flatten(),
		});
	}

	app.log.error(error);

	return reply.status(500).send({
		message: error instanceof Error ? error.message : 'Internal server error',
	});
});

export { app };
