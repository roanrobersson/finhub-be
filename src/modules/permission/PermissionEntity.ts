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

	constructor(name: string, description: string) {
		super();
		this.name = name;
		this.description = description;
	}
}
