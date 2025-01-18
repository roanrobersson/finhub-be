import { Permission } from "src/modules/permission/PermissionEntity";
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
	Unique,
	UpdateDateColumn
} from "typeorm";

@Entity()
@Unique(["name"])
export class Role {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	description: string;

	@ManyToMany(() => Permission)
	@JoinTable({ name: "role_permissions" })
	private permissions: Promise<Permission[]>;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	async getPermissions(): Promise<Permission[]> {
		const permissions = await this.permissions;
		return [...permissions];
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

	isNew(): boolean {
		return this.id === undefined;
	}

	equals(role: Role): boolean {
		return this.id === role.id;
	}
}
