import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	Unique,
	UpdateDateColumn
} from "typeorm";

@Entity()
export class Permission {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@Unique(["name"])
	name: string;

	@Column()
	description: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	isNew(): boolean {
		return this.id === undefined;
	}

	equals(permission: Permission): boolean {
		return this.id === permission.id;
	}
}
