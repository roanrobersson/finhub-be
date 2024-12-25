import "dotenv/config";

import { drizzle } from "drizzle-orm/node-postgres";
import { reset } from "drizzle-seed";

import * as schema from "./schema";
import { PermissionSeeder } from "./seeders/PermissionSeeder";
import { RoleSeeder } from "./seeders/RoleSeeder";
import { RoleToPermissionSeeder } from "./seeders/RoleToPermissionSeeder";
import { UserSeeder } from "./seeders/UserSeeder";
import { UserToRoleSeeder } from "./seeders/UserToRoleSeeder";

const run = async () => {
	const db = drizzle(process.env.DB_URL!, { schema });

	await reset(db, schema);

	await new PermissionSeeder().run();
	await new RoleSeeder().run();
	await new RoleToPermissionSeeder().run();
	await new UserSeeder().run();
	await new UserToRoleSeeder().run();

	console.log("Seed complete");
};

run();
