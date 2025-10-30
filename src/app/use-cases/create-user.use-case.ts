import { User } from '../entities/user.entity.js';
import type { IUserRepository } from '../repositories/user.repository.js';

export interface CreateUserInputDTO {
	name: string;
	email: string;
	password: string;
}

export interface CreateUserOutputDTO {
	id: string;
	name: string;
	email: string;
	created_at: Date;
}

export class CreateUserUseCase {
	constructor(private readonly userRepository: IUserRepository) {}

	async execute(input: CreateUserInputDTO): Promise<CreateUserOutputDTO> {
		const existingUser = await this.userRepository.find(input.email);

		if (existingUser) {
			throw new Error('User with this email is already registered');
		}

		const user = await User.create(input);

		await this.userRepository.save(user);

		return {
			id: user.id,
			name: user.name,
			email: user.email,
			created_at: user.created_at,
		};
	}
}
