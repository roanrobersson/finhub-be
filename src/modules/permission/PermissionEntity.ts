import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

import { BaseEntity } from "../../core/BaseEntity";

@Entity()
export class Permission extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@Unique(["name"])
	name: string;

	@Column()
	description: string;

	equals = (permission: Permission): boolean => {
		return this.id === permission.id;
	};
}
