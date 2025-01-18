import { DataSource } from "typeorm";
import { runSeeder, Seeder, SeederFactoryManager } from "typeorm-extension";

import PermissionSeeder from "./PermissionSeeder";
import RoleSeeder from "./RoleSeeder";
import UserSeeder from "./UserSeeder";

const DB_MIGRATIONS_TABLE_NAME = process.env.DB_MIGRATIONS_TABLE_NAME!;

export default class MainSeeder implements Seeder {
	public async run(
		dataSource: DataSource,
		factoryManager: SeederFactoryManager
	): Promise<any> {
		console.log("Starting seeder execution...");

		clearDatabase(dataSource, [DB_MIGRATIONS_TABLE_NAME]);

		await runSeeder(dataSource, PermissionSeeder);
		await runSeeder(dataSource, RoleSeeder);
		await runSeeder(dataSource, UserSeeder);

		console.log("Seeders executed successfully.");
	}
}

async function clearDatabase(
	dataSource: DataSource,
	ignoreTables: string[] = []
) {
	const queryRunner = dataSource.createQueryRunner();
	await queryRunner.connect();

	try {
		await queryRunner.startTransaction();
		await queryRunner.query(`SET session_replication_role = 'replica';`);
		const tables = await queryRunner.query(
			`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';`
		);
		for (const table of tables) {
			if (!ignoreTables.includes(table.table_name)) {
				await queryRunner.query(
					`TRUNCATE TABLE "${table.table_name}" CASCADE;`
				);
			}
		}
		await queryRunner.query(`SET session_replication_role = 'origin';`);
		await queryRunner.commitTransaction();
	} catch (error) {
		await queryRunner.rollbackTransaction();
		throw error;
	} finally {
		await queryRunner.release();
	}
}
