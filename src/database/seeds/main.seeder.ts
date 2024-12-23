import { DataSource } from "typeorm";
import { runSeeder, Seeder, SeederFactoryManager } from "typeorm-extension";

import PermissionSeeder from "./permission.seeder";
import RoleSeeder from "./role.seeder";

export default class MainSeeder implements Seeder {
	public async run(
		dataSource: DataSource,
		factoryManager: SeederFactoryManager
	): Promise<any> {
		console.log("Starting seeder execution...");

		await runSeeder(dataSource, RoleSeeder);
		await runSeeder(dataSource, PermissionSeeder);

		console.log("Seeders executed successfully.");
	}
}
