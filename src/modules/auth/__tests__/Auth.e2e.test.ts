import { HttpStatus, INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { dataSource } from "database/dataSource";
import { createLoggedInCommonUserAgent } from "src/__testUtils__/createLoggedInAgent";
import createTestApp from "src/__testUtils__/createTestApp";
import { createFakeUser } from "src/__testUtils__/fakes/fakeUser";
import { TestAccounts } from "src/__testUtils__/TestAccounts";
import { TestDatabaseSeeder } from "src/__testUtils__/TestDatabaseSeeder";
import { TestUserEnum } from "src/__testUtils__/TestUserEnum";
import { RoleEnum } from "src/core/enums/RoleEnum";
import { emailWithTimestamp, withTimestamp } from "src/core/utils/miscUtils";
import { isPasswordValid } from "src/core/utils/passwordUtils";
import { User } from "src/modules/user/UserEntity";
import request from "supertest";
import { Repository } from "typeorm";

describe("Auth E2E", () => {
	let app: INestApplication;
	let userRepository: Repository<User>;

	beforeAll(async () => {
		app = await createTestApp();
		if (!dataSource.isInitialized) {
			await dataSource.initialize();
		}
		const databaseSeeder = new TestDatabaseSeeder(dataSource);
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

		it("should return HTTP 409 when user already exists", async () => {
			let fakeUser = await createFakeUser();
			fakeUser.email = withTimestamp("user") + "@gmail.com";
			fakeUser = await userRepository.save(fakeUser);

			const response = await request(app.getHttpServer())
				.post("/auth/signup")
				.send({
					name: fakeUser.name,
					email: fakeUser.email,
					password: "12345678",
					picture: fakeUser.picture
				});

			expect(response.status).toBe(HttpStatus.CONFLICT);
		});

		it("should not persist user on database when user already exists", async () => {
			let fakeUser = await createFakeUser();
			fakeUser.email = withTimestamp("user") + "@gmail.com";
			fakeUser = await userRepository.save(fakeUser);

			await request(app.getHttpServer()).post("/auth/signup").send({
				name: fakeUser.name,
				email: fakeUser.email,
				password: "12345678",
				picture: fakeUser.picture
			});

			const databaseUser = await userRepository.findOneBy({
				email: fakeUser.email
			});
			expect(databaseUser!.updatedAt.toString()).toBe(
				fakeUser.updatedAt.toString()
			);
		});

		it("should return HTTP 204 and auth cookie when valid credentials", async () => {
			const secret = process.env.JWT_SECRET!;
			const jwtService = new JwtService({ secret });
			const user = await createFakeUser();
			const fakeUser = {
				name: user.name,
				email: emailWithTimestamp("anyname@gmail.com"),
				password: "12345678",
				picture: user.picture
			};

			const response = await request(app.getHttpServer())
				.post("/auth/signup")
				.send(fakeUser);

			expect(response.status).toBe(HttpStatus.CREATED);
			expect(response.headers["set-cookie"]).toBeDefined();
			expect(response.headers["set-cookie"][0]).toMatch(/access_token=.*/);
			const authCookie = response.headers["set-cookie"][0];
			const token = authCookie.split(";")[0].split("=")[1];
			await jwtService.verifyAsync(token, {
				secret: secret
			});
		});

		it("should return user data with default user role and permissions when valid credentials", async () => {
			const user = await createFakeUser();
			const fakeUser = {
				name: user.name,
				email: user.email,
				password: "12345678",
				picture: user.picture
			};

			const response = await request(app.getHttpServer())
				.post("/auth/signup")
				.send(fakeUser);

			expect(response.body.id).toBeDefined();
			expect(response.body.name).toBe(fakeUser.name);
			expect(response.body.email).toBe(fakeUser.email);
			expect(response.body.picture).toBe(fakeUser.picture);
			expect(response.body.roles).toEqual([RoleEnum.USER]);
			expect(response.body.permissions).toEqual([]);
		});

		it("should not return user password when valid credentials", async () => {
			const user = await createFakeUser();
			const password = "12345678";
			const fakeUser = {
				name: user.name,
				email: user.email,
				password,
				picture: user.picture
			};

			const response = await request(app.getHttpServer())
				.post("/auth/signup")
				.send(fakeUser);

			expect(response.body.password).toBeUndefined();
			expect(JSON.stringify(response.body).includes(password)).toBeFalsy();
		});

		it("should correct persist user on database when valid credentials", async () => {
			const user = await createFakeUser();
			const expectedPassword = "12345678";

			const response = await request(app.getHttpServer())
				.post("/auth/signup")
				.send({
					name: user.name,
					email: user.email,
					password: expectedPassword,
					picture: user.picture
				});

			const id = response.body.id;
			const databaseUser = await userRepository.findOneBy({
				id
			});
			expect(databaseUser).toBeDefined();
			expect(databaseUser!.email).toBe(user.email);
			expect(databaseUser!.name).toBe(user.name);
			expect(databaseUser!.picture).toBe(user.picture);
			const isCorrectPasswordHash = await isPasswordValid(
				expectedPassword,
				databaseUser!.password!
			);
			expect(isCorrectPasswordHash).toBeTruthy();
		});

		it("should persist user on database with default user role and permissions when valid credentials", async () => {
			const user = await createFakeUser();

			const response = await request(app.getHttpServer())
				.post("/auth/signup")
				.send({
					name: user.name,
					email: user.email,
					password: "12345678",
					picture: user.picture
				});

			const id = response.body.id;
			const databaseUser = await userRepository.findOne({
				where: { id },
				relations: ["roles", "roles.permissions"]
			});
			const databaseUserRoles = await databaseUser!.getRoles();
			const databaseUserPermissions = await databaseUser!.getPermissions();
			expect(databaseUserRoles).toHaveLength(1);
			expect(databaseUserRoles[0].name).toBe(RoleEnum.USER);
			expect(databaseUserPermissions).toHaveLength(0);
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
			// expect(response.body).toMatchObject({
			// 	name: expectedUser.name,
			// 	email: expectedUser.email,
			// 	picture: expectedUser.picture,
			// 	roles: [RoleEnum.USER],
			// 	permissions: []
			// });
		});
	});
});
