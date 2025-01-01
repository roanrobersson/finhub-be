import { Test, TestingModule } from "@nestjs/testing";

import { PermissionNotFoundException } from "../exceptions/PermissionNotFoundException";
import { Permission } from "../PermissionEntity";
import { PermissionRepository } from "../PermissionRepository";
import { PermissionService } from "../PermissionService";

const mockPermissionRepository = () => ({
	find: jest.fn(),
	findOneBy: jest.fn()
});

describe("PermissionService UT", () => {
	let service: PermissionService;
	let repository: PermissionRepository;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				PermissionService,
				{ provide: PermissionRepository, useFactory: mockPermissionRepository }
			]
		}).compile();

		service = module.get<PermissionService>(PermissionService);
		repository = module.get<PermissionRepository>(PermissionRepository);
	});

	describe("getAll", () => {
		it("should return permissions", async () => {
			const permission1 = new Permission();
			permission1.id = 1;
			const permission2 = new Permission();
			permission2.id = 2;
			const permissions = [permission1, permission2];
			jest.spyOn(repository, "find").mockResolvedValue(permissions);

			const result = await service.getAll();

			expect(result).toEqual(permissions);
		});
	});

	describe("getById", () => {
		it("should return permission", async () => {
			const id = 1;
			const permission = new Permission();
			permission.id = id;
			jest.spyOn(repository, "findOneBy").mockResolvedValue(permission);

			const result = await service.getById(id);

			expect(result).toEqual(permission);
		});

		it("should throw error when permission not found", async () => {
			const id = 1;
			jest.spyOn(repository, "findOneBy").mockResolvedValue(null);

			await expect(service.getById(id)).rejects.toThrow(
				PermissionNotFoundException
			);
		});
	});
});
