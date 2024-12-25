import { Inject, Injectable } from "@nestjs/common";
import { DrizzleAsyncProvider } from "database/DrizzleProvider";
import * as schema from "database/schema";
import { eq } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

import { Role } from "./RoleEntity";

@Injectable()
export class RoleRepository {
	@Inject(DrizzleAsyncProvider)
	private db: NodePgDatabase<typeof schema>;

	async findAll() {
		const roles = await this.db.query.role.findMany();
		return roles;
	}

	async findById(id: number) {
		const role = await this.db.query.role.findFirst({
			where: (role) => eq(role.id, id),
			with: {
				permissions: {
					with: {
						permission: true
					}
				}
			}
		});

		if (!role) {
			return null;
		}

		return {
			...role,
			permissions: role.permissions.map((rp) => rp.permission)
		};
	}

	async findByName(name: string) {
		const role = await this.db.query.role.findFirst({
			where: (role) => eq(role.name, name),
			with: {
				permissions: {
					with: {
						permission: true
					}
				}
			}
		});

		if (!role) {
			return null;
		}

		return {
			...role,
			permissions: role.permissions.map((rp) => rp.permission)
		};
	}

	async save(role: Role) {
		// if (role.isNew()) {
		await this.db
			.insert(schema.role)
			.values(role)
			.onConflictDoUpdate({
				target: schema.role.id,
				set: role
			})
			.execute();
		// } else {
		// 	// await this.db.update(schema.role).set(role).where(eq(schema.role.id, role.id));
		// }
	}

	async remove(id: number): Promise<Role | null> {
		const removeds = await this.db
			.delete(schema.role)
			.where(eq(schema.role.id, id))
			.returning();
		return (removeds[0] as Role) ?? null; // TODO fix this
	}
}
