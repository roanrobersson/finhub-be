import { PermissionEnum } from "src/core/enums/PermissionEnum";
import { Permission } from "src/modules/permission/PermissionEntity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

export default class PermissionSeeder implements Seeder {
	public async run(
		dataSource: DataSource,
		factoryManager: SeederFactoryManager
	): Promise<any> {
		const repository = dataSource.getRepository(Permission);

		const queryUsersRolesPermission = new Permission();
		queryUsersRolesPermission.name =
			PermissionEnum.QUERY_USERS_ROLES_PERMISSIONS;
		queryUsersRolesPermission.description =
			"Allows to query users, roles and permissions";

		const editUsersRolesPermission = new Permission();
		editUsersRolesPermission.name = PermissionEnum.EDIT_USERS_ROLES_PERMISSIONS;
		editUsersRolesPermission.description =
			"Allows to edit users, roles and permissions";

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
