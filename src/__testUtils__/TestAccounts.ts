export type UserTestCredentials = {
	username: string;
	password: string;
};

const TestAccounts: Record<string, UserTestCredentials> = {
	USER: { username: "user@gmail.com", password: "user" },
	ADMIN: { username: "admin@gmail.com", password: "admin" }
};

export default TestAccounts;
