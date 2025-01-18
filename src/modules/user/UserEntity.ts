import { Permission } from "src/modules/permission/PermissionEntity";
import { Role } from "src/modules/role/RoleEntity";
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
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	@Unique(["email"])
	email: string;

	@Column({ type: "varchar", nullable: true })
	password: string | null;

	@Column({ type: "varchar", nullable: true })
	picture: string | null;

	@ManyToMany(() => Role)
	@JoinTable({ name: "user_roles" })
	private roles: Promise<Role[]>;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	async getRoles(): Promise<Role[]> {
		const roles = await this.roles;
		return [...roles];
	}

	async addRole(role: Role): Promise<void> {
		const roles = (await this.roles) ?? [];
		if (!roles.find((r) => r.equals(role))) {
			this.roles = Promise.resolve([...roles, role]);
		}
	}

	async removeRole(role: Role): Promise<void> {
		const roles = (await this.roles) ?? [];
		this.roles = Promise.resolve(roles.filter((r) => !r.equals(role)));
	}

	async getPermissions(): Promise<Permission[]> {
		const roles = await this.getRoles();
		const permissionsArrays = await Promise.all(
			roles.map((role) => role.getPermissions())
		);
		const permissions = permissionsArrays.flat();
		return [...new Set(permissions)];
	}

	isNew(): boolean {
		return this.id === undefined;
	}

	equals(user: User): boolean {
		return this.id === user.id;
	}
}
