import { eq } from "drizzle-orm";

import { RoleEnum } from "./RoleSeeder";
import { Seeder } from "./Seeder";

export class UserToRoleSeeder extends Seeder {
	async run() {
		const adminUser = await this.db.query.user.findFirst({
			where: (user) => eq(user.name, "Admin")
		});
		const marcosUser = await this.db.query.user.findFirst({
			where: (user) => eq(user.name, "Marcos")
		});
		const mariaUser = await this.db.query.user.findFirst({
			where: (user) => eq(user.name, "Maria")
		});

		const adminRole = await this.db.query.role.findFirst({
			where: (role) => eq(role.name, RoleEnum.ADMIN)
		});
		const userRole = await this.db.query.role.findFirst({
			where: (role) => eq(role.name, RoleEnum.USER)
		});

		for (const userToRole of [
			{
				userId: adminUser!.id,
				roleId: adminRole!.id
			},
			{
				userId: marcosUser!.id,
				roleId: userRole!.id
			},
			{
				userId: mariaUser!.id,
				roleId: userRole!.id
			}
		]) {
			await this.db.insert(this.schema.userToRole).values(userToRole);
		}
	}
}
