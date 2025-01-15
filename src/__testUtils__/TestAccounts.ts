import { TestUserEnum } from "./TestUserEnum";

export type AccountCredentials = {
	username: string;
	password: string;
};

export const TestAccounts = {
	COMMON_USER: {
		username: TestUserEnum.COMMON_USER,
		password: "12345678"
	},
	ADMIN: {
		username: TestUserEnum.ADMIN,
		password: "12345678"
	}
} satisfies Record<string, AccountCredentials>;
