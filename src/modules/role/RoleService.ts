import { Inject, Injectable } from "@nestjs/common";
import { UniqueException } from "src/core/exceptions/UniqueException";
import { PermissionService } from "src/modules/permission/PermissionService";
import { Transactional } from "typeorm-transactional";

import { RoleNotFoundException } from "./exceptions/RoleNotFoundException";
import { Role } from "./RoleEntity";
import { RoleRepository } from "./RoleRepository";

@Injectable()
export class RoleService {
	@Inject()
	private roleRepository: RoleRepository;

	@Inject()
	private permissionService: PermissionService;

	async getAll(): Promise<Role[]> {
		return this.roleRepository.find();
	}

	async getById(id: number): Promise<Role> {
		const role = await this.roleRepository.findOne({
			where: { id },
			relations: ["permissions"]
		});
		if (!role) {
			throw new RoleNotFoundException(id);
		}
		return role;
	}

	async getByName(name: string): Promise<Role> {
		const role = await this.roleRepository.findOne({
			where: { name },
			relations: ["permissions"]
		});
		if (!role) {
			throw new RoleNotFoundException(name);
		}
		return role;
	}

	@Transactional()
	async save(role: Role): Promise<Role> {
		await this.validateUniqueRole(role);
		return await this.roleRepository.save(role);
	}

	async remove(id: number): Promise<void> {
		await this.roleRepository.delete(id);
	}

	@Transactional()
	async associatePermission(
		roleId: number,
		permissionId: number
	): Promise<void> {
		const role = await this.getById(roleId);
		const permission = await this.permissionService.getById(permissionId);
		await role.addPermission(permission);
		await this.roleRepository.save(role);
	}

	@Transactional()
	async disassociatePermission(
		roleId: number,
		permissionId: number
	): Promise<void> {
		const role = await this.getById(roleId);
		const permission = await this.permissionService.getById(permissionId);
		await role.removePermission(permission);
		await this.roleRepository.save(role);
	}

	async validateUniqueRole(role: Role) {
		const isInsert = role.isNew();
		const existingRole = await this.roleRepository.findByName(role.name);
		if (!existingRole) {
			return;
		}
		if (isInsert || existingRole.id !== role.id) {
			throw new UniqueException(`Role with name '${role.name}' already exists`);
		}
	}
}
