import { UserService } from "src/modules/user/UserService";

import { Seeder } from "./Seeder";

export class UserSeeder extends Seeder {
	async run() {
		for (const user of [
			{
				name: "Admin",
				email: "admin@gmail.com",
				password: await UserService.hashPassword("admin")
			},
			{
				name: "Marcos",
				email: "marcos@gmail.com",
				password: await UserService.hashPassword("marcos")
			},
			{
				name: "Maria",
				email: "maria@gmail.com",
				password: await UserService.hashPassword("maria")
			}
		]) {
			await this.db.insert(this.schema.user).values(user);
		}
	}
}
