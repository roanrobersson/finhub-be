import { Inject, Injectable } from "@nestjs/common";
import { DrizzleAsyncProvider } from "database/DrizzleProvider";
import * as schema from "database/schema";
import { eq } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

@Injectable()
export class PermissionRepository {
	@Inject(DrizzleAsyncProvider)
	private db: NodePgDatabase<typeof schema>;

	async findAll() {
		const permissions = await this.db.query.permission.findMany();
		return permissions;
	}

	async findById(id: number) {
		const permission = await this.db.query.permission.findFirst({
			where: (permission) => eq(permission.id, id)
		});
		return permission;
	}
}
