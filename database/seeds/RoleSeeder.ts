import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

import { Permission } from "../../src/modules/permission/PermissionEntity";
import { Role } from "../../src/modules/role/RoleEntity";
import { DefaultPermissionName } from "./PermissionSeeder";

export default class RoleSeeder implements Seeder {
	public async run(
		dataSource: DataSource,
		factoryManager: SeederFactoryManager
	): Promise<any> {
		const permissionRepository = dataSource.getRepository(Permission);
		const roleRepository = dataSource.getRepository(Role);

		const queryUsersRolesPermission =
			await permissionRepository.findOneByOrFail({
				name: DefaultPermissionName.QUERY_USERS_ROLES_PERMISSIONS
			});

		const editUsersRolesPermission = await permissionRepository.findOneByOrFail(
			{
				name: DefaultPermissionName.EDIT_USERS_ROLES_PERMISSIONS
			}
		);

		const adminRole = new Role(DefaultRoleName.ADMIN, "Administrator");
		await adminRole.addPermission(queryUsersRolesPermission);
		await adminRole.addPermission(editUsersRolesPermission);

		const userRole = new Role(DefaultRoleName.USER, "Regular user");

		const roles = [adminRole, userRole];

		for (const role of roles) {
			const exists = await roleRepository.existsBy({ name: role.name });
			if (!exists) {
				await roleRepository.save(role);
			}
		}
	}
}

export enum DefaultRoleName {
	ADMIN = "admin",
	USER = "user",
	TEST = "test"
}
