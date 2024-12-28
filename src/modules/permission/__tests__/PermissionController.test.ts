import { Test, TestingModule } from "@nestjs/testing";

import { PermissionController } from "../PermissionController";

describe("PermissionController", () => {
	let controller: PermissionController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [PermissionController]
		}).compile();

		controller = module.get<PermissionController>(PermissionController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
