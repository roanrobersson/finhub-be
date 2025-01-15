import { HttpStatus, INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { dataSource } from "database/dataSource";
import { createLoggedInCommonUserAgent } from "src/__testUtils__/createLoggedInAgent";
import createTestApp from "src/__testUtils__/createTestApp";
import { createFakeUser } from "src/__testUtils__/fakes/fakeUser";
import { TestAccounts } from "src/__testUtils__/TestAccounts";
import { TestDatabaseSeeder } from "src/__testUtils__/TestDatabaseSeeder";
import { TestUserEnum } from "src/__testUtils__/TestUserEnum";
import { emailWithTimestamp } from "src/core/utils/miscUtils";
import { User } from "src/modules/user/UserEntity";
import request from "supertest";
import { Repository } from "typeorm";

describe("Auth E2E", () => {
	let app: INestApplication;
	let databaseSeeder: TestDatabaseSeeder;
	let userRepository: Repository<User>;

	beforeAll(async () => {
		app = await createTestApp();
		if (!dataSource.isInitialized) {
			await dataSource.initialize();
		}
		databaseSeeder = new TestDatabaseSeeder(dataSource);
		await databaseSeeder.seed();
		userRepository = dataSource.getRepository(User);
	});

	afterAll(async () => {
		await app.close();
	});

	describe("POST /auth/signin", () => {
		it("should return HTTP 401 when invalid credentials", async () => {
			const response = await request(app.getHttpServer())
				.post("/auth/signin")
				.send({
					username: "invalid@gmail.com",
					password: "invalid"
				});

			expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
		});

		it("should return HTTP 200 and auth cookie when valid credentials", async () => {
			const secret = process.env.JWT_SECRET!;
			const jwtService = new JwtService({ secret });

			const response = await request(app.getHttpServer())
				.post("/auth/signin")
				.send(TestAccounts.COMMON_USER);

			expect(response.status).toBe(HttpStatus.OK);
			expect(response.headers["set-cookie"]).toBeDefined();
			expect(response.headers["set-cookie"][0]).toMatch(/access_token=.*/);
			const authCookie = response.headers["set-cookie"][0];
			const token = authCookie.split(";")[0].split("=")[1];
			await jwtService.verifyAsync(token, {
				secret: secret
			});
		});
	});

	describe("POST /auth/signup", () => {
		it("should return HTTP 400 when missing parameters", async () => {
			const response = await request(app.getHttpServer())
				.post("/auth/signup")
				.send({
					name: "AnyName"
				});

			expect(response.status).toBe(HttpStatus.BAD_REQUEST);
		});

		it("should return HTTP 409 when user aready exists", async () => {
			let user = await createFakeUser();
			user = await userRepository.save(user);

			const response = await request(app.getHttpServer())
				.post("/auth/signup")
				.send({
					name: "AnyName",
					email: user.email,
					password: "12345678",
					picuture: null
				});

			expect(response.status).toBe(HttpStatus.CONFLICT);
		});

		it("should return HTTP 204, auth cookie and user data when valid credentials", async () => {
			const secret = process.env.JWT_SECRET!;
			const jwtService = new JwtService({ secret });

			const response = await request(app.getHttpServer())
				.post("/auth/signup")
				.send({
					name: "AnyName",
					email: emailWithTimestamp("anyname@gmail.com"),
					password: "12345678",
					picture: null
				});

			expect(response.status).toBe(HttpStatus.CREATED);
			expect(response.headers["set-cookie"]).toBeDefined();
			expect(response.headers["set-cookie"][0]).toMatch(/access_token=.*/);
			const authCookie = response.headers["set-cookie"][0];
			const token = authCookie.split(";")[0].split("=")[1];
			await jwtService.verifyAsync(token, {
				secret: secret
			});
		});
	});

	describe("POST /auth/signout", () => {
		it("should return HTTP 200 when user is not authenticated", async () => {
			const response = await request(app.getHttpServer()).post("/auth/signout");

			expect(response.status).toBe(HttpStatus.OK);
		});

		it("should return HTTP 200 and remove auth cookie", async () => {
			const agent = await createLoggedInCommonUserAgent(app, dataSource);
			const response = await agent.post("/auth/signout");

			expect(response.status).toBe(HttpStatus.OK);
			expect(response.headers["set-cookie"]).toBeDefined();
			expect(response.headers["set-cookie"][0]).toMatch(/access_token=;/); // Empty cookie
		});
	});

	describe("GET /auth/profile", () => {
		it("should return HTTP 401 when user not authenticated", async () => {
			const response = await request(app.getHttpServer()).get("/auth/profile");

			expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
		});

		it("should return HTTP 200 and user profile when user authenticated", async () => {
			const agent = await createLoggedInCommonUserAgent(app, dataSource);
			const response = await agent.get("/auth/profile");
			const expectedUser = await userRepository.findOneByOrFail({
				email: TestUserEnum.COMMON_USER
			});

			expect(response.status).toBe(HttpStatus.OK);
			expect(response.body).toMatchObject({
				name: expectedUser.name,
				email: expectedUser.email,
				picture: expectedUser.picture
			});
		});
	});
});
