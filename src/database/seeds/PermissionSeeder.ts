import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

import { Permission } from "../../modules/roles/PermissionEntity";

export default class PermissionSeeder implements Seeder {
	public async run(
		dataSource: DataSource,
		factoryManager: SeederFactoryManager
	): Promise<any> {
		const repository = dataSource.getRepository(Permission);

		const permissions = [
			{
				name: "QUERY_USERS_ROLES_PERMISSIONS",
				description: "Allows to query users, roles and permissions"
			},
			{
				name: "EDIT_USERS_ROLES_PERMISSIONS",
				description: "Allows to edit users, roles and permissions"
			}
		];

		for (const permission of permissions) {
			const existingPermission = await repository.findOneBy({
				name: permission.name
			});
			if (!existingPermission) {
				await repository.insert(permission);
			}
		}
	}
}
