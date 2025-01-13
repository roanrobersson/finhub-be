import { HttpStatus, INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { dataSource } from "database/dataSource";
import createLoggedInAgent from "src/__testUtils__/createLoggedInAgent";
import createTestApp from "src/__testUtils__/createTestApp";
import { createFakeUser } from "src/__testUtils__/fakes/fakeUser";
import TestAccounts from "src/__testUtils__/TestAccounts";
import { User } from "src/modules/user/UserEntity";
import request from "supertest";
import { Repository } from "typeorm";

describe("Auth E2E", () => {
	let app: INestApplication;
	let userRepository: Repository<User>;

	beforeAll(async () => {
		app = await createTestApp();
		await initDatabase();
	});

	afterAll(async () => {
		await userRepository.delete({});
		await app.close();
	});

	const initDatabase = async () => {
		await dataSource.initialize();
		userRepository = dataSource.getRepository(User);
		const user = await createFakeUser();
		await userRepository.save(user);
	};

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
				.send(TestAccounts.USER);

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

	describe("POST /auth/signout", () => {
		it("should return HTTP 200 when user is not authenticated", async () => {
			const response = await request(app.getHttpServer()).post("/auth/signout");

			expect(response.status).toBe(HttpStatus.OK);
		});

		it("should return HTTP 200 and remove auth cookie", async () => {
			const agent = await createLoggedInAgent(app, TestAccounts.USER);
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
			const agent = await createLoggedInAgent(app, TestAccounts.USER);
			const response = await agent.get("/auth/profile");

			const fakeUser = await createFakeUser();
			expect(response.status).toBe(HttpStatus.OK);
			expect(response.body).toMatchObject({
				name: fakeUser.name,
				email: fakeUser.email,
				picture: fakeUser.picture
			});
		});
	});
});
