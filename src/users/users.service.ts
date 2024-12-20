import { Injectable } from "@nestjs/common";

export type User = any;

@Injectable()
export class UsersService {
	private readonly users = [
		{
			userId: 1,
			username: "roan",
			password: "vaca"
		},
		{
			userId: 2,
			username: "maria",
			password: "vaca"
		}
	];

	async findOne(username: string): Promise<User | undefined> {
		return this.users.find((user) => user.username === username);
	}
}
