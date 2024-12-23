import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

import { Permission } from "../../modules/roles/PermissionEntity";
import { Role } from "../../modules/roles/RoleEntity";
import { DefaultPermissionNameEnum } from "./PermissionSeeder";

export default class RoleSeeder implements Seeder {
	public async run(
		dataSource: DataSource,
		factoryManager: SeederFactoryManager
	): Promise<any> {
		const permissionRepository = dataSource.getRepository(Permission);
		const roleRepository = dataSource.getRepository(Role);

		const queryUsersRolesPermission =
			await permissionRepository.findOneByOrFail({
				name: DefaultPermissionNameEnum.QUERY_USERS_ROLES_PERMISSIONS
			});

		const editUsersRolesPermission = await permissionRepository.findOneByOrFail(
			{
				name: DefaultPermissionNameEnum.EDIT_USERS_ROLES_PERMISSIONS
			}
		);

		const adminRole = new Role(DefaultRoleNameEnum.ADMIN, "Administrator");
		adminRole.addPermission(queryUsersRolesPermission);
		adminRole.addPermission(editUsersRolesPermission);

		const testRole = new Role(DefaultRoleNameEnum.TEST, "Test");
		testRole.addPermission(queryUsersRolesPermission);
		testRole.addPermission(editUsersRolesPermission);

		const userRole = new Role(DefaultRoleNameEnum.USER, "Regular user");

		const roles = [adminRole, testRole, userRole];

		for (const role of roles) {
			const exists = await roleRepository.existsBy({ name: role.name });
			if (!exists) {
				await roleRepository.save(role);
			}
		}
	}
}

export enum DefaultRoleNameEnum {
	ADMIN = "admin",
	USER = "user",
	TEST = "test"
}
