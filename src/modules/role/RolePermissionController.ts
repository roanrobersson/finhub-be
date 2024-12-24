import { Controller, Delete, Get, Inject, Param, Put } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";

import { AssociateRolePermissionParams } from "./dtos/associateDtos";
import { DesassociateRolePermissionParams } from "./dtos/disassociateDtos";
import { GetAllRolePermissionsResponseDto } from "./dtos/getAllRolePermisssionsDtos";
import { RoleService } from "./RoleService";

@Controller("roles/:roleId/permissions")
export class RolePermissionController {
	@Inject()
	private roleService: RoleService;

	@Get()
	@ApiOperation({ summary: "List all role permissions" })
	async getAll(): Promise<GetAllRolePermissionsResponseDto[]> {
		// return this.roleService.findAll();
		return []; // TODO: Implement this
	}

	@Put(":permissionId")
	@ApiOperation({ summary: "" })
	async associate(
		@Param() params: AssociateRolePermissionParams
	): Promise<void> {
		return this.roleService.associatePermission(
			params.roleId,
			params.permissionId
		);
	}

	@Delete(":permissionId")
	@ApiOperation({ summary: "" })
	async disassociate(
		@Param() params: DesassociateRolePermissionParams
	): Promise<void> {
		return this.roleService.disassociatePermission(
			params.roleId,
			params.permissionId
		);
	}
}
