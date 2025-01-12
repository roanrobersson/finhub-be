export class AuthUser {
	id: number;
	name: string;
	email: string;
	picture: string | null;
	roles: string[];
	permissions: string[];
	isNewUser: boolean;
}
