import { HttpStatus, INestApplication } from "@nestjs/common";
import { dataSource } from "database/dataSource";
import createLoggedInAgent from "src/__testUtils__/createLoggedInAgent";
import createTestApp from "src/__testUtils__/createTestApp";
import { createFakeUser } from "src/__testUtils__/fakes/fakeUser";
import TestAccounts from "src/__testUtils__/TestAccounts";
import { User } from "src/modules/user/UserEntity";
import request from "supertest";
import { Repository } from "typeorm";

import { Permission } from "../PermissionEntity";

describe("Permission E2E", () => {
	let app: INestApplication;
	let userRepository: Repository<User>;
	let permissionRepository: Repository<Permission>;

	beforeAll(async () => {
		app = await createTestApp();
		await initDatabase();
	});

	const initDatabase = async () => {
		await dataSource.initialize();

		userRepository = dataSource.getRepository(User);
		const user = await createFakeUser();
		await userRepository.save(user);
		permissionRepository = dataSource.getRepository(Permission);
		await permissionRepository.save([
			{ name: "PERMISSION_1", description: "" },
			{ name: "PERMISSION_2", description: "" }
		]);
	};

	afterAll(async () => {
		await userRepository.delete({});
		await permissionRepository.delete({});
		await app.close();
	});

	describe("GET /permissions", () => {
		it("should return HTTP 401 when user not authenticated", async () => {
			const response = await request(app.getHttpServer()).get("/permissions");

			expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
		});

		it("should return HTTP 200 and an array with all permissions", async () => {
			const agent = await createLoggedInAgent(app, TestAccounts.USER);

			const response = await agent.get("/permissions");

			expect(response.status).toBe(HttpStatus.OK);
			const permissionNames = response.body.map(
				(permission) => permission.name
			);
			expect(permissionNames).toEqual(
				expect.arrayContaining(["PERMISSION_1", "PERMISSION_2"])
			);
		});
	});
});
