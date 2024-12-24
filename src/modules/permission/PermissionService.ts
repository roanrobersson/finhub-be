import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Permission } from "./PermissionEntity";

@Injectable()
export class PermissionService {
	@InjectRepository(Permission)
	private permissionRepository: Repository<Permission>;

	async getById(id: number): Promise<Permission> {
		const permission = await this.permissionRepository.findOneBy({ id });
		if (!permission) {
			throw new NotFoundException(`Permission with id ${id} not found`);
		}
		return permission;
	}

	async getAll(): Promise<Permission[]> {
		return this.permissionRepository.find();
	}
}
