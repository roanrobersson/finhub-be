import "dotenv/config";

import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";

import MainSeeder from "../database/seeds/MainSeeder";

export const options: DataSourceOptions & SeederOptions = {
	type: "postgres",
	url: process.env.DB_URL,
	synchronize: Boolean(process.env.DB_SYNC),
	seedTracking: false,
	seeds: [MainSeeder],
	entities: ["src/modules/**/*Entity{.ts,.js}"],
	factories: ["database/factories/**/*{.ts,.js}"],
	migrations: ["database/migrations/**/*{.ts,.js}"]
};

export const dataSource = new DataSource(options);
