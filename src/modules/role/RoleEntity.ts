import { Permission } from "../permission/PermissionEntity";

export class Role {
	id: number;

	name: string;

	description: string;

	// @ManyToMany(() => Permission, {
	// 	cascade: true
	// })
	// @JoinTable({ name: "role_permissions" })
	private permissions: Promise<Permission[]>;

	constructor(name: string, description: string) {
		this.name = name;
		this.description = description;
	}

	isNew = () => {
		return !this.id;
	};

	async getPermissions(): Promise<Permission[]> {
		return this.permissions;
	}

	async addPermission(permission: Permission): Promise<void> {
		const permissions = (await this.permissions) ?? [];
		if (!permissions.find((p) => p.id === permission.id)) {
			this.permissions = Promise.resolve([...permissions, permission]);
		}
	}

	async removePermission(permission: Permission): Promise<void> {
		const permissions = (await this.permissions) ?? [];
		this.permissions = Promise.resolve(
			permissions.filter((p) => p.id !== permission.id)
		);
	}
}
