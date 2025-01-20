import { RoleEnum } from "src/core/enums/RoleEnum";

export class AuthUser {
	id: number;
	name: string;
	email: string;
	picture: string | null;
	roles: string[];
	permissions: string[];
	isNewUser: boolean;

	isAdmin(): boolean {
		return this.roles.includes(RoleEnum.ADMIN);
	}
}
