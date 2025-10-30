import { User } from '../entities/user.entity.js';

export interface IUserRepository {
	find(email: string): Promise<User | null>;
	save(user: User): Promise<void>;
}
