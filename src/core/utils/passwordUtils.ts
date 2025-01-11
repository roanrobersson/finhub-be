import * as bcrypt from "bcrypt";

export const isPasswordValid = (
	plainPassword: string,
	hashedPassword: string | null
): Promise<boolean> => {
	if (!hashedPassword) {
		return Promise.resolve(false);
	}
	return bcrypt.compare(plainPassword, hashedPassword);
};

export const hashPassword = (password: string): Promise<string> => {
	const saltRounds = 10;
	return bcrypt.hash(password, saltRounds);
};
