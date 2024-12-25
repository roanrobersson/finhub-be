import { Inject, Injectable } from "@nestjs/common";
import { NotFoundException } from "src/core/exceptions/NotFoundException";
import { UniqueException } from "src/core/exceptions/UniqueException";
import { PermissionService } from "src/modules/permission/PermissionService";

import { Role } from "./RoleEntity";
import { RoleRepository } from "./RoleRepository";

@Injectable()
export class RoleService {
	@Inject()
	private roleRepository: RoleRepository;

	@Inject()
	private permissionService: PermissionService;

	async getAll(): Promise<Role[]> {
		return this.roleRepository.findAll() as any;
	}

	async getById(id: number): Promise<Role> {
		const role = await this.roleRepository.findById(id);
		if (!role) {
			throw new NotFoundException(`Role with id ${id} not found`);
		}
		return role as any; // TODO fix this
	}

	async save(role: Role): Promise<Role> {
		await this.validateUniqueRole(role);
		await this.roleRepository.save(role); // Falta retornar a rola salva
		return role;
	}

	async remove(id: number): Promise<void> {
		try {
			const removed = await this.roleRepository.remove(id);

			if (!removed) {
				throw new NotFoundException(`Role with id ${id} not found`);
			}
		} catch (error) {
			if (
				typeof error === "object" &&
				error !== null &&
				"code" in error &&
				error.code === "23503"
			) {
				console.log("violates foreign key constraint");
			}
		}
	}

	async validateUniqueRole(role: Role) {
		const isInsert = role.isNew();
		const existingRole = await this.roleRepository.findByName(role.name);
		if (!existingRole) {
			return;
		}
		if (isInsert || existingRole.id !== role.id) {
			throw new UniqueException(`Role with name ${role.name} already exists`);
		}
	}

	// async associatePermission(
	// 	roleId: number,
	// 	permissionId: number
	// ): Promise<void> {
	// 	const role = await this.getById(roleId);
	// 	const permission = await this.permissionService.getById(permissionId);
	// 	await role.addPermission(permission);
	// 	await this.roleRepository.save(role);
	// }

	// async disassociatePermission(
	// 	roleId: number,
	// 	permissionId: number
	// ): Promise<void> {
	// 	const role = await this.getById(roleId);
	// 	const permission = await this.permissionService.getById(permissionId);
	// 	await role.removePermission(permission);
	// 	await this.roleRepository.save(role);
	// }
}
