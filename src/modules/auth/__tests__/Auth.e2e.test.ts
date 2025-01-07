import { HttpStatus, INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
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

describe("Auth E2E", () => {
	let app: INestApplication;
	let userRepository: Repository<User>;

	initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule]
		}).compile();
		app = moduleFixture.createNestApplication();
		await app.init();
		await initDatabase();
	});

	afterAll(async () => {
		await app.close();
		await userRepository.delete({});
	});

	const initDatabase = async () => {
		await dataSource.initialize();
		userRepository = dataSource.getRepository(User);
		await userRepository.save({
			name: "Test",
			email: "test@gmail.com",
			password: await hashPassword("test")
		});
	};

	describe("GET /auth/signin", () => {
		it("should return HTTP 401 when invalid credentials", () => {
			return request(app.getHttpServer())
				.post("/auth/signin")
				.send({
					username: "invalid@gmail.com",
					password: "invalid"
				})
				.expect(HttpStatus.UNAUTHORIZED);
		});

		it("should return HTTP 200 and token data when valid credentials", async () => {
			const secret = process.env.JWT_SECRET!;
			const jwtService = new JwtService({ secret });

			const response = await request(app.getHttpServer())
				.post("/auth/signin")
				.send({
					username: "test@gmail.com",
					password: "test"
				})
				.expect(HttpStatus.OK);

			expect(response).toHaveProperty("body.access_token");
			const { access_token } = response.body;
			await jwtService.verifyAsync(access_token, {
				secret: secret
			});
		});
	});
});
