import { describe, it, expect, beforeEach } from 'vitest';
import { User } from '../../../src/app/entities/user.entity.js';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('User entity', () => {
	let userData: { name: string; email: string; password: string };

	beforeEach(() => {
		userData = {
			name: 'João Lucas',
			email: 'joaolucas@gmail.com',
			password: 'joao1234',
		};
	});

	it('Should create a user successfully', async () => {
		const user = await User.create(userData);

		expect(user).toBeInstanceOf(User);
		expect(user.id).toBeTypeOf('string');
		expect(user.name).toBe('João Lucas');
		expect(user.email).toBe('joaolucas@gmail.com');
		expect(user.password).not.toBe('password123');
		expect(user.created_at).toBeInstanceOf(Date);
	});

	it('Should fail to create user with invalid email', async () => {
		userData.email = 'invalid-email';

		await expect(User.create(userData)).rejects.toThrow(
			'Invalid email format.',
		);
	});

	it('Should fail to create user with short password', async () => {
		userData.password = 'short';

		await expect(User.create(userData)).rejects.toThrow(
			'Password must be at least 8 characters long.',
		);
	});

	it('Should update user successfully', async () => {
		const user = await User.create(userData);
		const oldUpdateDate = user.updated_at;

		await delay(10);

		const newUpdateData = {
			name: 'João Lucas Carvalho',
			email: 'joaolucascarvalho@gmail.com',
		};

		user.update(newUpdateData);

		expect(user.name).toBe(newUpdateData.name);
		expect(user.email).toBe(newUpdateData.email);
		expect(user.updated_at).not.toEqual(oldUpdateDate);
	});

	it('Should fail to update user with short name', async () => {
		const user = await User.create(userData);

		expect(() => user.update({ name: 'ab', email: 'fail@test.com' })).toThrow(
			'Name is too short',
		);
	});

	it('Should fail to update user with invalid email', async () => {
		const user = await User.create(userData);

		expect(() =>
			user.update({ name: 'Valid Name', email: 'invalid-email' }),
		).toThrow('Invalid email format.');
	});

	it('Should soft delete user', async () => {
		const user = await User.create(userData);
		expect(user.deleted_at).toBe(null);

		user.delete();

		expect(user.deleted_at).toBeInstanceOf(Date);
	});

	it('Should restore deleted user', async () => {
		const user = await User.create(userData);
		user.delete();
		expect(user.deleted_at).toBeInstanceOf(Date);

		user.restore();

		expect(user.deleted_at).toBe(null);
	});
});
