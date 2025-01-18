import { PermissionEnum } from "src/core/enums/PermissionEnum";
import { RoleEnum } from "src/core/enums/RoleEnum";
import { hashPassword } from "src/core/utils/passwordUtils";
import { Permission } from "src/modules/permission/PermissionEntity";
import { Role } from "src/modules/role/RoleEntity";
import { User } from "src/modules/user/UserEntity";
import { DataSource, Repository } from "typeorm";

import { TestAccounts } from "./TestAccounts";

export class TestDatabaseSeeder {
	private dataSource: DataSource;
	private permissionRepository: Repository<Permission>;
	private roleRepository: Repository<Role>;
	private userRepository: Repository<User>;

	constructor(dataSource: DataSource) {
		if (!dataSource.isInitialized) {
			throw new Error("Data source is not initialized");
		}
		this.dataSource = dataSource;
		this.permissionRepository = dataSource.getRepository(Permission);
		this.roleRepository = dataSource.getRepository(Role);
		this.userRepository = dataSource.getRepository(User);
	}

	async seed(): Promise<void> {
		// Creates permissions

		let queryUserRolesPermission = new Permission();
		queryUserRolesPermission.name =
			PermissionEnum.QUERY_USERS_ROLES_PERMISSIONS;
		queryUserRolesPermission.description = "Query users roles and permissions";
		queryUserRolesPermission = await this.createPermissionIfNotExists(
			queryUserRolesPermission
		);
		queryUserRolesPermission.createdAt = new Date();
		queryUserRolesPermission.updatedAt = new Date();

		let editUserRolesPermission = new Permission();
		editUserRolesPermission.name = PermissionEnum.EDIT_USERS_ROLES_PERMISSIONS;
		editUserRolesPermission.description = "Edit users roles and permissions";
		editUserRolesPermission = await this.createPermissionIfNotExists(
			editUserRolesPermission
		);
		editUserRolesPermission.createdAt = new Date();
		editUserRolesPermission.updatedAt = new Date();

		// Creates roles

		let userRole = new Role();
		userRole.name = RoleEnum.USER;
		userRole.description = "User role";
		userRole = await this.createRoleIfNotExists(userRole);
		userRole.createdAt = new Date();
		userRole.updatedAt = new Date();

		let adminRole = new Role();
		adminRole.name = RoleEnum.ADMIN;
		adminRole.description = "Admin role";
		adminRole.addPermission(queryUserRolesPermission);
		adminRole.addPermission(editUserRolesPermission);
		adminRole = await this.createRoleIfNotExists(adminRole);
		adminRole.createdAt = new Date();
		adminRole.updatedAt = new Date();

		// Creates users

		let commonUser = new User();
		commonUser.name = "User";
		commonUser.email = TestAccounts.COMMON_USER.username;
		commonUser.password = await hashPassword(TestAccounts.COMMON_USER.password);
		commonUser.picture = "https://i.pravatar.cc/150?img=26";
		commonUser.addRole(userRole);
		commonUser = await this.createUserIfNotExists(commonUser);
		commonUser.createdAt = new Date();
		commonUser.updatedAt = new Date();

		let adminUser = new User();
		adminUser.name = "Admin";
		adminUser.email = TestAccounts.ADMIN.username;
		adminUser.password = await hashPassword(TestAccounts.ADMIN.password);
		adminUser.picture = "https://i.pravatar.cc/150?img=1";
		adminUser.addRole(adminRole);
		adminUser = await this.createUserIfNotExists(adminUser);
		adminUser.createdAt = new Date();
		adminUser.updatedAt = new Date();
	}

	async revert(): Promise<void> {
		await this.userRepository.delete({});
		await this.roleRepository.delete({});
		await this.permissionRepository.delete({});
	}

	private async createPermissionIfNotExists(
		permission: Permission
	): Promise<Permission> {
		let existingPermission = await this.permissionRepository.findOneBy({
			name: permission.name
		});

		if (!existingPermission) {
			existingPermission = await this.permissionRepository.save(permission);
		}

		return existingPermission;
	}

	private async createRoleIfNotExists(role: Role): Promise<Role> {
		let existingRole = await this.roleRepository.findOneBy({
			name: role.name
		});

		if (!existingRole) {
			existingRole = await this.roleRepository.save(role);
		}

		return existingRole;
	}

	private async createUserIfNotExists(user: User): Promise<User> {
		let existingUser = await this.userRepository.findOneBy({
			email: user.email
		});

		if (!existingUser) {
			existingUser = await this.userRepository.save(user);
		}

		return existingUser;
	}
}
