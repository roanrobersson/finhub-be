import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
	Unique
} from "typeorm";

import { Role } from "../roles/RoleEntity";

@Entity()
export class User {
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

	@ManyToMany(() => Role, { cascade: true })
	@JoinTable({ name: "user_roles" })
	private roles: Role[];

	constructor(name: string, email: string, password: string) {
		this.name = name;
		this.email = email;
		this.password = password;
	}

	addRole(role: Role) {
		if (!this.roles) {
			this.roles = [];
		}
		if (!this.roles.includes(role)) {
			this.roles.push(role);
		}
	}

	removeRole(role: Role) {
		if (!this.roles) {
			return;
		}
		this.roles.filter((r) => r.id !== role.id);
	}
}
