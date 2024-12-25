import path from "path";
import { exit } from "process";
import * as dotenv from "dotenv";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";

import * as schema from "./schema";

dotenv.config();

(async () => {
	const pool = new Pool({
		connectionString: process.env.DB_URL!
	});
	let db: NodePgDatabase<typeof schema> | null = null;
	db = drizzle(pool, {
		schema: {
			...schema
		}
	});

	// Look for migrations in the src/drizzle/migrations folder
	const migrationPath = path.join(process.cwd(), "database/migrations");

	// Run the migrations
	await migrate(db, { migrationsFolder: migrationPath });

	console.log("Migration complete");

	exit(0);
})();
