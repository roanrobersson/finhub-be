import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

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
}
