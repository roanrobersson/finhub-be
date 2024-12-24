import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PermissionService } from "src/modules/permission/PermissionService";
import { Repository } from "typeorm";

import { Role } from "./RoleEntity";

@Injectable()
export class RoleService {
	@InjectRepository(Role)
	private roleRepository: Repository<Role>;

	@Inject()
	private permissionService: PermissionService;

	async getById(id: number): Promise<Role> {
		const role = await this.roleRepository.findOne({
			where: { id },
			relations: ["permissions"]
		});
		if (!role) {
			throw new NotFoundException(`Role with id ${id} not found`);
		}
		return role;
	}

	async getAll(): Promise<Role[]> {
		return this.roleRepository.find();
	}

	async save(role: Role): Promise<Role> {
		this.roleRepository.save(role);
		return role;
	}

	async remove(id: number): Promise<void> {
		await this.roleRepository.delete(id);
	}

	async associatePermission(
		roleId: number,
		permissionId: number
	): Promise<void> {
		const role = await this.getById(roleId);
		const permission = await this.permissionService.getById(permissionId);
		await role.addPermission(permission);
		await this.roleRepository.save(role);
	}

	async disassociatePermission(
		roleId: number,
		permissionId: number
	): Promise<void> {
		const role = await this.getById(roleId);
		const permission = await this.permissionService.getById(permissionId);
		await role.removePermission(permission);
		await this.roleRepository.save(role);
	}
}
