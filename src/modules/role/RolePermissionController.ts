import {
	Controller,
	Delete,
	HttpCode,
	HttpStatus,
	Inject,
	Param,
	Put
} from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";

import { AssociateRolePermissionParams } from "./dtos/associateDtos";
import { DesassociateRolePermissionParams } from "./dtos/disassociateDtos";
import { RoleService } from "./RoleService";

@Controller("roles/:roleId/permissions")
export class RolePermissionController {
	@Inject()
	private roleService: RoleService;

	@Put(":permissionId")
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiOperation({ summary: "Associate a permission to a role" })
	async associate(
		@Param() params: AssociateRolePermissionParams
	): Promise<void> {
		// await this.roleService.associatePermission(
		// 	params.roleId,
		// 	params.permissionId
		// );
	}

	@Delete(":permissionId")
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiOperation({ summary: "Disassociate a permission from a role" })
	async disassociate(
		@Param() params: DesassociateRolePermissionParams
	): Promise<void> {
		// await this.roleService.disassociatePermission(
		// 	params.roleId,
		// 	params.permissionId
		// );
	}
}
