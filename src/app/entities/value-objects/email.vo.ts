export class Email {
	private _value: string;
	private constructor(value: string) {
		this._value = value.toLowerCase();
	}
	public get value(): string {
		return this._value;
	}
	public static create(value: string): Email {
		const emailRegex =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!value || !emailRegex.test(value.toLowerCase())) {
			throw new Error('Invalid email format.');
		}
		return new Email(value);
	}
}
