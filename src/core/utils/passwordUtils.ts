import * as bcrypt from "bcrypt";

export function isPasswordValid(
	plainPassword: string,
	hashedPassword: string | null
): Promise<boolean> {
	if (!hashedPassword) {
		return Promise.resolve(false);
	}
	return bcrypt.compare(plainPassword, hashedPassword);
}

export function hashPassword(password: string): Promise<string> {
	const saltRounds = 10;
	return bcrypt.hash(password, saltRounds);
}
