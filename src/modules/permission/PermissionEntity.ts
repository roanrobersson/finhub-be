import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	Unique,
	UpdateDateColumn
} from "typeorm";

@Entity()
@Unique(["name"])
export class Permission {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
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
