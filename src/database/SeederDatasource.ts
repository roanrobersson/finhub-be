import "dotenv/config";

import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";

import MainSeeder from "./seeds/MainSeeder";

const options: DataSourceOptions & SeederOptions = {
	type: "postgres",
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT),
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	synchronize: process.env.DB_SYNC === "true",
	seedTracking: false,
	entities: ["src/modules/**/*Entity{.ts,.js}"],
	seeds: [MainSeeder],
	factories: ["src/database/factories/**/*{.ts,.js}"]
};

export const dataSource = new DataSource(options);
