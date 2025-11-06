import 'reflect-metadata';
import { AppDataSource } from './infra/database/typeorm/data-source.js';
import { app } from './infra/http/server.js';
import { env } from './config/env.js';

async function startServer() {
	console.log('Iniciando o servidor...');

	try {
		await AppDataSource.initialize();
		console.log('Banco de dados inicializado!');

		await app.listen({
			host: '0.0.0.0',
			port: env.PORT,
		});

		console.log(`🚀 Servidor HTTP rodando na porta ${env.PORT}`);
	} catch (error) {
		console.error('❌ Erro ao iniciar o servidor:', error);
		process.exit(1);
	}
}

startServer();
