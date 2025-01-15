import { HttpStatus, INestApplication } from "@nestjs/common";
import { dataSource } from "database/dataSource";
import { createLoggedInAdminAgent } from "src/__testUtils__/createLoggedInAgent";
import createTestApp from "src/__testUtils__/createTestApp";
import { TestDatabaseSeeder } from "src/__testUtils__/TestDatabaseSeeder";
import { withTimestamp } from "src/core/utils/miscUtils";
import request from "supertest";
import { Repository } from "typeorm";

import { Permission } from "../PermissionEntity";

describe("Permission E2E", () => {
	let app: INestApplication;
	let databaseSeeder: TestDatabaseSeeder;
	let permissionRepository: Repository<Permission>;

	beforeAll(async () => {
		app = await createTestApp();
		if (!dataSource.isInitialized) {
			await dataSource.initialize();
		}
		databaseSeeder = new TestDatabaseSeeder(dataSource);
		await databaseSeeder.seed();
		permissionRepository = dataSource.getRepository(Permission);
	});

	afterAll(async () => {
		await app.close();
	});

	describe("GET /permissions", () => {
		it("should return HTTP 401 when user not authenticated", async () => {
			const response = await request(app.getHttpServer()).get("/permissions");

			expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
		});

		it("should return HTTP 200 and an array with all permissions", async () => {
			const agent = await createLoggedInAdminAgent(app, dataSource);
			const permission1Name = withTimestamp("PERMISSION_1");
			const permission2Name = withTimestamp("PERMISSION_2");
			const permission1 = new Permission();
			permission1.name = permission1Name;
			permission1.description = "Permission 1";
			await permissionRepository.save(permission1);
			const permission2 = new Permission();
			permission2.name = permission2Name;
			permission2.description = "Permission 2";
			await permissionRepository.save(permission2);

			const response = await agent.get("/permissions");

			expect(response.status).toBe(HttpStatus.OK);
			const permissionNames = response.body.map(
				(permission) => permission.name
			);
			expect(permissionNames).toEqual(
				expect.arrayContaining([permission1Name, permission2Name])
			);
		});
	});
});
