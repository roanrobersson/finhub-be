import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import {
	initializeTransactionalContext,
	StorageDriver
} from "typeorm-transactional";

import { AppModule } from "./AppModule";

describe("App E2E", () => {
	let app: INestApplication;
	initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule]
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it("/ (GET)", () => {
		return request(app.getHttpServer())
			.get("/")
			.expect(200)
			.expect("Hello world!");
	});
});
