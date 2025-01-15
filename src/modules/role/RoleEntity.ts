import { BaseEntity } from "src/core/BaseEntity";
import { Permission } from "src/modules/permission/PermissionEntity";
import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
	Unique
} from "typeorm";

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
		if (!permissions.find((p) => p.equals(permission))) {
			this.permissions = Promise.resolve([...permissions, permission]);
		}
	}

	async removePermission(permission: Permission): Promise<void> {
		const permissions = (await this.permissions) ?? [];
		this.permissions = Promise.resolve(
			permissions.filter((p) => !p.equals(permission))
		);
	}

	isNew = () => {
		return !this.id;
	};

	equals = (role: Role): boolean => {
		return this.id === role.id;
	};
}
