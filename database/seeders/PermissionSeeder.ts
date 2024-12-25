import { Seeder } from "./Seeder";

export class PermissionSeeder extends Seeder {
	async run() {
		for (const permission of [
			{
				name: "QUERY_USERS_ROLES_PERMISSIONS",
				description: "Allows to query users, roles and permissions"
			},
			{
				name: "EDIT_USERS_ROLES_PERMISSIONS",
				description: "Allows to edit users, roles and permissions"
			}
		]) {
			await this.db.insert(this.schema.permission).values(permission);
		}
	}
}

export enum PermissionEnum {
	QUERY_USERS_ROLES_PERMISSIONS = "QUERY_USERS_ROLES_PERMISSIONS",
	EDIT_USERS_ROLES_PERMISSIONS = "EDIT_USERS_ROLES_PERMISSIONS"
}
