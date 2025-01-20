import { RoleEnum } from "src/core/enums/RoleEnum";
import { Permission } from "src/modules/permission/PermissionEntity";
import { Role } from "src/modules/role/RoleEntity";
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
	Unique,
	UpdateDateColumn
} from "typeorm";

import { Tag } from "../tag/TagEntity";

@Entity()
@Unique(["email"])
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	email: string;

	@Column({ type: "varchar", nullable: true })
	password: string | null;

	@Column({ type: "varchar", nullable: true })
	picture: string | null;

	@ManyToMany(() => Role)
	@JoinTable({ name: "user_roles" })
	private roles: Promise<Role[]>;

	@OneToMany(() => Tag, (tag) => tag.user)
	private tags: Promise<Tag[]>;

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

	async getTags(): Promise<Tag[]> {
		const tags = await this.tags;
		return [...tags];
	}

	async addTag(tag: Tag): Promise<void> {
		const tags = (await this.tags) ?? [];
		if (!tags.find((t) => t.equals(tag))) {
			this.tags = Promise.resolve([...tags, tag]);
		}
	}

	async removeTag(tag: Tag): Promise<void> {
		const tags = (await this.tags) ?? [];
		this.tags = Promise.resolve(tags.filter((t) => !t.equals(tag)));
	}

	async isAdmin(): Promise<boolean> {
		const roles = await this.getRoles();
		return roles.some((role) => role.name === RoleEnum.ADMIN);
	}

	isNew(): boolean {
		return this.id === undefined;
	}

	equals(user: User): boolean {
		return this.id === user.id;
	}
}
