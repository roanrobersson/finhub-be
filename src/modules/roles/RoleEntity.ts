import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class Role {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@Unique(["name"])
	name: string;

	@Column()
	description: string;
}
