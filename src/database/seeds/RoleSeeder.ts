import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

import { Role } from "../../modules/roles/RoleEntity";

export default class RoleSeeder implements Seeder {
	public async run(
		dataSource: DataSource,
		factoryManager: SeederFactoryManager
	): Promise<any> {
		const repository = dataSource.getRepository(Role);

		const roles = [
			{ name: "admin", description: "Administrator", permissions: [] },
			{ name: "user", description: "Regular user", permissions: [] }
		];

		for (const role of roles) {
			const existingRole = await repository.findOneBy({ name: role.name });
			if (!existingRole) {
				await repository.insert(role);
			}
		}
	}
}
