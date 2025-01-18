import "dotenv/config";

import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";

import MainSeeder from "./seeds/MainSeeder";

const options: DataSourceOptions & SeederOptions = {
	type: "postgres",
	url: process.env.DB_URL,
	seedTracking: false,
	seeds: [MainSeeder],
	entities: ["src/modules/**/*Entity{.ts,.js}"],
	factories: ["database/factories/**/*{.ts,.js}"],
	migrations: ["database/migrations/**/*{.ts,.js}"],
	migrationsTableName: process.env.DB_MIGRATIONS_TABLE_NAME
};

export const dataSource = new DataSource(options);
