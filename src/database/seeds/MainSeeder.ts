import { DataSource } from "typeorm";
import { runSeeder, Seeder, SeederFactoryManager } from "typeorm-extension";

import PermissionSeeder from "./PermissionSeeder";
import RoleSeeder from "./RoleSeeder";
import UserSeeder from "./UserSeeder";

export default class MainSeeder implements Seeder {
	public async run(
		dataSource: DataSource,
		factoryManager: SeederFactoryManager
	): Promise<any> {
		console.log("Starting seeder execution...");

		await runSeeder(dataSource, PermissionSeeder);
		await runSeeder(dataSource, RoleSeeder);
		await runSeeder(dataSource, UserSeeder);

		console.log("Seeders executed successfully.");
	}
}
