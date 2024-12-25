import dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config({
	path: ".env"
});

export default {
	schema: "./database/schema.ts",
	out: "./database/migrations",
	dialect: "postgresql",
	dbCredentials: { url: process.env.DB_URL! },
	verbose: true,
	strict: true
} satisfies Config;
