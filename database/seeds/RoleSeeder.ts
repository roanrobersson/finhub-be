import { PermissionEnum } from "src/core/enums/PermissionEnum";
import { RoleEnum } from "src/core/enums/RoleEnum";
import { Permission } from "src/modules/permission/PermissionEntity";
import { Role } from "src/modules/role/RoleEntity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

export default class RoleSeeder implements Seeder {
	public async run(
		dataSource: DataSource,
		factoryManager: SeederFactoryManager
	): Promise<any> {
		const permissionRepository = dataSource.getRepository(Permission);
		const roleRepository = dataSource.getRepository(Role);

		const queryUsersRolesPermission =
			await permissionRepository.findOneByOrFail({
				name: PermissionEnum.QUERY_USERS_ROLES_PERMISSIONS
			});

		const editUsersRolesPermission = await permissionRepository.findOneByOrFail(
			{
				name: PermissionEnum.EDIT_USERS_ROLES_PERMISSIONS
			}
		);

		const adminRole = new Role();
		adminRole.name = RoleEnum.ADMIN;
		adminRole.description = "Administrator role";
		await adminRole.addPermission(queryUsersRolesPermission);
		await adminRole.addPermission(editUsersRolesPermission);

		const userRole = new Role();
		userRole.name = RoleEnum.USER;
		userRole.description = "Regular user role";
		const roles = [adminRole, userRole];

		for (const role of roles) {
			const exists = await roleRepository.existsBy({ name: role.name });
			if (!exists) {
				await roleRepository.save(role);
			}
		}
	}
}
