import { User } from '../../../../app/entities/user.entity.js';
import { UserModel } from '../models/user.model.js';

export class UserMapper {
	static toPersistence(user: User): UserModel {
		const userModel = new UserModel();
		userModel.id = user.id;
		userModel.name = user.name;
		userModel.email = user.email;
		userModel.password_hash = user.password;
		userModel.created_at = user.created_at;
		userModel.updated_at = user.updated_at;
		userModel.deleted_at = user.deleted_at;

		return userModel;
	}

	static toDomain(userModel: UserModel): User {
		return User.reconstitute(
			{
				name: userModel.name,
				email: userModel.email,
				password: userModel.password_hash,
			},
			userModel.id,
			userModel.created_at,
			userModel.updated_at,
			userModel.deleted_at,
		);
	}
}
