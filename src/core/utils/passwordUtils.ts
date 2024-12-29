import * as bcrypt from "bcrypt";

export const isPasswordValid = (
	plainPassword: string,
	hashedPassword: string
): Promise<boolean> => {
	return bcrypt.compare(plainPassword, hashedPassword);
};

export const hashPassword = (password: string): Promise<string> => {
	const saltRounds = 10;
	return bcrypt.hash(password, saltRounds);
};
