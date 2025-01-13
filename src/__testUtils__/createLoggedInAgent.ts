import { INestApplication } from "@nestjs/common";
import request, { Agent } from "supertest";

import { UserTestCredentials } from "./TestAccounts";

async function createLoggedInAgent(
	app: INestApplication,
	authData: UserTestCredentials
): Promise<Agent> {
	const agent = request.agent(app.getHttpServer());
	await agent.post("/auth/signin").send(authData);
	return agent;
}

export default createLoggedInAgent;
