import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
	Unique
} from "typeorm";

import { BaseEntity } from "../../core/BaseEntity";
import { Role } from "../role/RoleEntity";

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	@Unique(["email"])
	email: string;

	@Column()
	password: string;

	@Column({ default: true })
	isActive: boolean;

	@ManyToMany(() => Role)
	@JoinTable({ name: "user_roles" })
	private roles: Promise<Role[]>;

	constructor(name: string, email: string, password: string) {
		super();
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
