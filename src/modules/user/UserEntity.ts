import { BaseEntity } from "src/core/BaseEntity";
import { Permission } from "src/modules/permission/PermissionEntity";
import { Role } from "src/modules/role/RoleEntity";
import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
	Unique
} from "typeorm";

@Entity()
export class User extends BaseEntity {
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

	async getRoles(): Promise<Role[]> {
		return this.roles;
	}

	async addRole(role: Role) {
		const roles = (await this.roles) ?? [];
		if (!roles.find((p) => p.equals(role))) {
			this.roles = Promise.resolve([...roles, role]);
		}
	}

	async removeRole(role: Role) {
		const roles = (await this.roles) ?? [];
		this.roles = Promise.resolve(roles.filter((p) => p.equals(role)));
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
		return !this.id;
	}

	equals = (user: User): boolean => {
		return this.id === user.id;
	};
}
