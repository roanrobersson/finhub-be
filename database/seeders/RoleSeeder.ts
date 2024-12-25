import { Seeder } from "./Seeder";

export class RoleSeeder extends Seeder {
	async run() {
		//  Role

		for (const role of [
			{
				name: "Admin",
				description: "Administrator"
			},
			{
				name: "User",
				description: "Regular user"
			}
		]) {
			await this.db.insert(this.schema.role).values(role).returning();
		}
	}
}

export enum RoleEnum {
	ADMIN = "Admin",
	USER = "User"
}
