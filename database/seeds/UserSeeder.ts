import { RoleEnum } from "src/core/enums/RoleEnum";
import { hashPassword } from "src/core/utils/passwordUtils";
import { Role } from "src/modules/role/RoleEntity";
import { User } from "src/modules/user/UserEntity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

export default class UserSeeder implements Seeder {
	public async run(
		dataSource: DataSource,
		factoryManager: SeederFactoryManager
	): Promise<any> {
		const userRepository = dataSource.getRepository(User);
		const roleRepository = dataSource.getRepository(Role);

		const adminRole = await roleRepository.findOneByOrFail({
			name: RoleEnum.ADMIN
		});
		const userRole = await roleRepository.findOneByOrFail({
			name: RoleEnum.USER
		});

		const adminUser = new User();
		adminUser.name = "Admin";
		adminUser.email = "admin@gmail.com";
		adminUser.password = await hashPassword("admin123");
		adminUser.addRole(adminRole);

		const felipeUser = new User();
		felipeUser.name = "Marcos";
		felipeUser.email = "marcos@gmail.com";
		felipeUser.password = await hashPassword("marcos123");
		felipeUser.addRole(userRole);

		const mariaUser = new User();
		mariaUser.name = "Maria";
		mariaUser.email = "maria@gmail.com";
		mariaUser.password = await hashPassword("maria123");
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
