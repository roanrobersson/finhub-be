import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

import { Role } from "../../modules/roles/RoleEntity";
import { User } from "../../modules/users/UserEntity";
import { UserService } from "../../modules/users/UserService";
import { DefaultRoleNameEnum } from "./RoleSeeder";

export default class UserSeeder implements Seeder {
	public async run(
		dataSource: DataSource,
		factoryManager: SeederFactoryManager
	): Promise<any> {
		const userRepository = dataSource.getRepository(User);
		const roleRepository = dataSource.getRepository(Role);

		const adminRole = await roleRepository.findOneBy({
			name: DefaultRoleNameEnum.ADMIN
		});
		const userRole = await roleRepository.findOneBy({
			name: DefaultRoleNameEnum.USER
		});

		const adminUser = new User(
			"Admin",
			"admin@gmail.com",
			await UserService.hashPassword("admin")
		);
		adminUser.addRole(adminRole);

		const felipeUser = new User(
			"Marcos",
			"marcos@gmail.com",
			await UserService.hashPassword("marcos")
		);
		felipeUser.addRole(userRole);

		const mariaUser = new User(
			"Maria",
			"maria@gmail.com",
			await UserService.hashPassword("maria")
		);
		mariaUser.addRole(userRole);

		const users = [adminUser, felipeUser, mariaUser];

		for (const user of users) {
			const existingUser = await userRepository.existsBy({
				email: user.email
			});
			if (!existingUser) {
				await userRepository.save(user);
			}
		}
	}
}
