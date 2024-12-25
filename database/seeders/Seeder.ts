import { drizzle } from "drizzle-orm/node-postgres";

import * as schema from "../schema";

export abstract class Seeder {
	protected db = drizzle(process.env.DB_URL!, { schema });
	protected schema = schema;

	abstract run();

	// async truncateTable(tableName: string) {
	// 	await this.db.execute(
	// 		sql.raw(`TRUNCATE TABLE ${tableName} RESTART IDENTITY CASCADE`)
	// 	);
	// }
}
