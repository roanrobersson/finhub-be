import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

import { Permission } from "../../src/modules/permission/PermissionEntity";

export default class PermissionSeeder implements Seeder {
	public async run(
		dataSource: DataSource,
		factoryManager: SeederFactoryManager
	): Promise<any> {
		const repository = dataSource.getRepository(Permission);

		const queryUsersRolesPermission = new Permission(
			DefaultPermissionName.QUERY_USERS_ROLES_PERMISSIONS,
			"Allows to query users, roles and permissions"
		);
		const editUsersRolesPermission = new Permission(
			DefaultPermissionName.EDIT_USERS_ROLES_PERMISSIONS,
			"Allows to edit users, roles and permissions"
		);

		const permissions = [queryUsersRolesPermission, editUsersRolesPermission];

		for (const permission of permissions) {
			const exists = await repository.existsBy({
				name: permission.name
			});
			if (!exists) {
				await repository.save(permission);
			}
		}
	}
}

export enum DefaultPermissionName {
	QUERY_USERS_ROLES_PERMISSIONS = "QUERY_USERS_ROLES_PERMISSIONS",
	EDIT_USERS_ROLES_PERMISSIONS = "EDIT_USERS_ROLES_PERMISSIONS"
}