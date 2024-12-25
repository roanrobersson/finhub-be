import { Role } from "../role/RoleEntity";

export class User {
	id: number;

	name: string;

	email: string;

	password: string;

	isActive: boolean;

	private roles: Promise<Role[]>;

	constructor(name: string, email: string, password: string) {
		this.name = name;
		this.email = email;
		this.password = password;
	}

	isNew(): boolean {
		return !this.id;
	}

	async getRoles(): Promise<Role[]> {
		return this.roles;
	}

	async addRole(role: Role) {
		const roles = (await this.roles) ?? [];
		if (!roles.find((p) => p.id === role.id)) {
			this.roles = Promise.resolve([...roles, role]);
		}
	}

	async removeRole(role: Role) {
		const roles = (await this.roles) ?? [];
		this.roles = Promise.resolve(roles.filter((p) => p.id !== role.id));
	}
}
