import { ConfigService } from "@nestjs/config";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "./schema";

export const DrizzleAsyncProvider = "DrizzleAsyncProvider";

export const drizzleProvider = [
	{
		provide: DrizzleAsyncProvider,
		inject: [ConfigService],
		useFactory: async (configService: ConfigService) => {
			const pool = new Pool({
				connectionString: configService.get<string>("DB_URL")
			});
			return drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;
		}
	}
];
