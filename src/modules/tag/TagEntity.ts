import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	Unique,
	UpdateDateColumn
} from "typeorm";

import { User } from "../user/UserEntity";

@Entity()
@Unique(["name", "userId"])
export class Tag {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@ManyToOne(() => User, (user) => user.getTags, { onDelete: "CASCADE" })
	user: Promise<User>;

	@Column()
	userId: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	isNew(): boolean {
		return this.id === undefined;
	}

	equals(tag: Tag): boolean {
		return this.id === tag.id;
	}
}
