import { Inject, Injectable, NotFoundException } from "@nestjs/common";

import { Permission } from "./PermissionEntity";
import { PermissionRepository } from "./PermissionRepository";

@Injectable()
export class PermissionService {
	@Inject()
	private permissionRepository: PermissionRepository;

	async getAll(): Promise<Permission[]> {
		return this.permissionRepository.findAll();
	}

	async getById(id: number): Promise<Permission> {
		const permission = await this.permissionRepository.findById(id);
		if (!permission) {
			throw new NotFoundException(`Permission with id ${id} not found`);
		}
		return permission;
	}
}
