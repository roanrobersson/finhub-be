import "dotenv/config";

import { DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";

import MainSeeder from "./seeds/MainSeeder";

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
	type: "postgres",
	url: process.env.DB_URL,
	seedTracking: false,
	seeds: [MainSeeder],
	entities: ["src/modules/**/*Entity{.ts,.js}"],
	factories: ["database/factories/**/*{.ts,.js}"],
	migrations: ["database/migrations/**/*{.ts,.js}"]
};
