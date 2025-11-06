import type { FastifyInstance } from 'fastify';
import { UserController } from '../controllers/create-user.controller.js';

const userController = new UserController();

export async function userRoutes(app: FastifyInstance) {
	app.post('/users', (request, reply) => userController.create(request, reply));
}
