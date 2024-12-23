import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
	Unique
} from "typeorm";

import { Permission } from "./PermissionEntity";

@Entity()
export class Role {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@Unique(["name"])
	name: string;

	@Column()
	description: string;

	@ManyToMany(() => Permission, {
		cascade: true
	})
	@JoinTable({ name: "role_permissions" })
	private permissions: Permission[];

	constructor(name: string, description: string) {
		this.name = name;
		this.description = description;
	}

	addPermission(permission: Permission): void {
		if (!this.permissions) {
			this.permissions = [];
		}
		if (!this.permissions.includes(permission)) {
			this.permissions.push(permission);
		}
	}

	removePermission(permission: Permission): void {
		if (!this.permissions) {
			return;
		}
		this.permissions.filter((p) => p.id !== permission.id);
	}
}
