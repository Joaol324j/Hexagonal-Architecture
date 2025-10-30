import type { Repository } from 'typeorm';
import type { User } from '../../../../app/entities/user.entity.js';
import type { IUserRepository } from '../../../../app/repositories/user.repository.js';
import { UserModel } from '../models/user.model.js';
import { UserMapper } from '../mappers/user.mapper.js';
import { AppDataSource } from '../data-source.js';

export class TypeOrmUserRepository implements IUserRepository {
	private ormRepository: Repository<UserModel>;

	constructor() {
		this.ormRepository = AppDataSource.getRepository(UserModel);
	}

	async save(user: User): Promise<void> {
		const userModel = UserMapper.toPersistence(user);
		await this.ormRepository.save(userModel);
	}

	async find(email: string): Promise<User | null> {
		const userModel = await this.ormRepository.findOneBy({ email });

		if (!userModel) {
			return null;
		}

		return UserMapper.toDomain(userModel);
	}
}
