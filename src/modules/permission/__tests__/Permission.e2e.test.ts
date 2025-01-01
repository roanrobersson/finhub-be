import { HttpStatus, INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { dataSource } from "database/dataSource";
import { AppModule } from "src/AppModule";
import { hashPassword } from "src/core/utils/passwordUtils";
import { User } from "src/modules/user/UserEntity";
import * as request from "supertest";
import { Repository } from "typeorm";
import {
	initializeTransactionalContext,
	StorageDriver
} from "typeorm-transactional";

import { Permission } from "../PermissionEntity";

describe("Permission E2E", () => {
	let app: INestApplication;
	let jwtToken: string;
	let userRepository: Repository<User>;
	let permissionRepository: Repository<Permission>;

	initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule]
		}).compile();
		app = moduleFixture.createNestApplication();
		await app.init();
		await initDatabase();
	});

	const initDatabase = async () => {
		await dataSource.initialize();
		userRepository = dataSource.getRepository(User);
		await userRepository.save({
			name: "Test",
			email: "test@gmail.com",
			password: await hashPassword("test")
		});
		permissionRepository = dataSource.getRepository(Permission);
		await permissionRepository.save([
			{ name: "PERMISSION_1", description: "" },
			{ name: "PERMISSION_2", description: "" }
		]);

		const response = await request(app.getHttpServer())
			.post("/auth/signin")
			.send({ username: "test@gmail.com", password: "test" });

		jwtToken = response.body.access_token;
	};

	afterAll(async () => {
		await app.close();
		await userRepository.delete({});
		await permissionRepository.delete({});
	});

	describe("GET /permissions", () => {
		it("should return HTTP 401 when user not authenticated", () => {
			return request(app.getHttpServer())
				.get("/permissions")
				.expect(HttpStatus.UNAUTHORIZED);
		});

		it("should return HTTP 200 and an array with all permissions", async () => {
			const response = await request(app.getHttpServer())
				.get("/permissions")
				.set("Authorization", `Bearer ${jwtToken}`)
				.expect(HttpStatus.OK);

			const permissionNames = response.body.map(
				(permission) => permission.name
			);
			expect(permissionNames).toEqual(
				expect.arrayContaining(["PERMISSION_1", "PERMISSION_2"])
			);
		});
	});
});
