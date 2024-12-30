import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
	Unique
} from "typeorm";

import { BaseEntity } from "../../core/BaseEntity";
import { Permission } from "../permission/PermissionEntity";

@Entity()
export class Role extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@Unique(["name"])
	name: string;

	@Column()
	description: string;

	@ManyToMany(() => Permission)
	@JoinTable({ name: "role_permissions" })
	private permissions: Promise<Permission[]>;

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

	isNew = () => {
		return !this.id;
	};

	equals = (role: Role): boolean => {
		return this.id === role.id;
	};
}
