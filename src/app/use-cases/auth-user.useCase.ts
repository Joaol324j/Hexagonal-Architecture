import jwt from 'jsonwebtoken';
import type { IUserRepository } from '../repositories/user.repository.js';
import { env } from '../../config/env.js';

export interface AuthenticateInputDTO {
	email: string;
	password: string;
}

export interface AuthenticateOutputDTO {
	token: string;
	user: {
		id: string;
		name: string;
		email: string;
	};
}

export class AuthenticateUserUseCase {
	constructor(private readonly userRepository: IUserRepository) {}

	async execute(input: AuthenticateInputDTO): Promise<AuthenticateOutputDTO> {
		if (!input.email || !input.password) {
			throw new Error('Email and password are required.');
		}

		const user = await this.userRepository.find(input.email);
		if (!user) {
			throw new Error('Invalid email or password.');
		}

		const passwordVO = user['props'].password;
		const passwordMatch = await passwordVO.compare(input.password);

		if (!passwordMatch) {
			throw new Error('Invalid email or password.');
		}

		const token = jwt.sign(
			{
				sub: user.id,
				name: user.name,
				email: user.email,
			},
			env.JWT_SECRET,
			{
				expiresIn: '1d',
			},
		);

		return {
			token,
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
			},
		};
	}
}
