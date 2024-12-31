import { BaseEntity } from "src/core/BaseEntity";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

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
