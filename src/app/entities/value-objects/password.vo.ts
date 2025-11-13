import bcrypt from 'bcrypt';
import { hash } from 'bcrypt';

export class Password {
	private _value: string;

	private constructor(value: string) {
		this._value = value;
	}

	public async compare(plainText: string): Promise<boolean> {
		return bcrypt.compare(plainText, this._value);
	}

	public get value(): string {
		return this._value;
	}

	public static async createAndHash(value: string): Promise<Password> {
		if (value.length < 8) {
			throw new Error('Password must be at least 8 characters long.');
		}

		const hashedPassword = await hash(value, 10);

		return new Password(hashedPassword);
	}

	public static reconstitute(hashedValue: string): Password {
		return new Password(hashedValue);
	}
}
