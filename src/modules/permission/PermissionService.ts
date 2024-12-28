import { Inject, Injectable } from "@nestjs/common";

import { PermissionNotFoundException } from "./exceptions/PermissionNotFoundException";
import { Permission } from "./PermissionEntity";
import { PermissionRepository } from "./PermissionRepository";

@Injectable()
export class PermissionService {
	@Inject()
	private permissionRepository: PermissionRepository;

	async getAll(): Promise<Permission[]> {
		return this.permissionRepository.find();
	}

	async getById(id: number): Promise<Permission> {
		const permission = await this.permissionRepository.findOneBy({
			id
		});
		if (!permission) {
			throw new PermissionNotFoundException(id);
		}
		return permission;
	}
}
