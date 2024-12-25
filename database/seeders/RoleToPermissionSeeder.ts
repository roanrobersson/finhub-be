import { eq } from "drizzle-orm";

import { PermissionEnum } from "./PermissionSeeder";
import { RoleEnum } from "./RoleSeeder";
import { Seeder } from "./Seeder";

export class RoleToPermissionSeeder extends Seeder {
	async run() {
		const adminRole = await this.db.query.role.findFirst({
			where: (role) => eq(role.name, RoleEnum.ADMIN)
		});
		const userRole = await this.db.query.role.findFirst({
			where: (role) => eq(role.name, RoleEnum.USER)
		});

		const queryUserRolesPermissions = await this.db.query.permission.findFirst({
			where: (permission) =>
				eq(permission.name, PermissionEnum.QUERY_USERS_ROLES_PERMISSIONS)
		});
		const editUserRolesPermissions = await this.db.query.permission.findFirst({
			where: (permission) =>
				eq(permission.name, PermissionEnum.EDIT_USERS_ROLES_PERMISSIONS)
		});

		for (const roleToPermission of [
			{
				roleId: adminRole!.id,
				permissionId: queryUserRolesPermissions!.id
			},
			{
				roleId: adminRole!.id,
				permissionId: editUserRolesPermissions!.id
			}
		]) {
			await this.db
				.insert(this.schema.roleToPermission)
				.values(roleToPermission);
		}
	}
}
