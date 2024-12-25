import { Inject, Injectable } from "@nestjs/common";
import { DrizzleAsyncProvider } from "database/DrizzleProvider";
import * as schema from "database/schema";
import { eq } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

import { User } from "./UserEntity";

@Injectable()
export class UserRepository {
	@Inject(DrizzleAsyncProvider)
	private db: NodePgDatabase<typeof schema>;

	async findAll() {
		const roles = await this.db.query.user.findMany();
		return roles;
	}

	async findById(id: number) {
		const role = await this.db.query.user.findFirst({
			where: (role) => eq(role.id, id),
			with: {
				roles: {
					with: {
						role: true
					}
				}
			}
		});

		if (!role) {
			return null;
		}

		return {
			...role,
			roles: role.roles.map((rp) => rp.role)
		};
	}

	async findByEmail(email: string) {
		const user = await this.db.query.user.findFirst({
			where: (user) => eq(user.email, email),
			with: {
				roles: {
					with: {
						role: true
					}
				}
			}
		});

		if (!user) {
			return null;
		}

		return {
			...user,
			permissions: user.roles.map((rp) => rp.role)
		};
	}

	async save(user: User) {
		// if (user.isNew()) {
		await this.db
			.insert(schema.user)
			.values(user)
			.onConflictDoUpdate({
				target: schema.user.id,
				set: user
			})
			.execute();
		// } else {
		// 	// await this.db.update(schema.user).set(user).where(eq(schema.user.id, role.id));
		// }
	}

	async remove(id: number) {
		await this.db.delete(schema.user).where(eq(schema.user.id, id));
	}
}
