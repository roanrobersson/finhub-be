import { INestApplication } from "@nestjs/common";
import { SignInRequest } from "src/modules/auth/dtos/SignInRequest";
import request, { Agent } from "supertest";
import { DataSource } from "typeorm";

import { TestAccounts } from "./TestAccounts";

export async function createLoggedInCommonUserAgent(
	app: INestApplication,
	dataSource: DataSource
): Promise<Agent> {
	return createLoggedInAgent(app, dataSource, {
		username: TestAccounts.COMMON_USER.username,
		password: TestAccounts.COMMON_USER.password
	});
}

export async function createLoggedInAdminAgent(
	app: INestApplication,
	dataSource: DataSource
): Promise<Agent> {
	return createLoggedInAgent(app, dataSource, {
		username: TestAccounts.ADMIN.username,
		password: TestAccounts.ADMIN.password
	});
}

export async function createLoggedInAgent(
	app: INestApplication,
	dataSource: DataSource,
	signInRequest: SignInRequest
): Promise<Agent> {
	const agent = request.agent(app.getHttpServer());
	await agent.post("/auth/signin").send({
		username: signInRequest.username,
		password: signInRequest.password
	});
	return agent;
}
