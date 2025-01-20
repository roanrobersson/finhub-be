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
import { ApiDefaultActionResponse } from "src/core/decorators/ApiDefaultResponseDecorator";
import { RoleEnum } from "src/core/enums/RoleEnum";

import { RequireRoles } from "../auth/RequireRolesDecorator";

import "./dtos/params";

import {
	AssociateUserRoleParams,
	DesassociateUserRoleParams
} from "./dtos/params";
import { UserService } from "./UserService";

@Controller("users/:userId/roles")
export class UserRoleController {
	@Inject()
	private userService: UserService;

	@Put(":roleId")
	@RequireRoles(RoleEnum.ADMIN)
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiOperation({ summary: "Associate a role to a user" })
	@ApiDefaultActionResponse({
		description: "The role has been successfully associated."
	})
	async associate(@Param() params: AssociateUserRoleParams): Promise<void> {
		await this.userService.associateRole(params.userId, params.roleId);
	}

	@Delete(":roleId")
	@RequireRoles(RoleEnum.ADMIN)
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiOperation({ summary: "Disassociate a role from a user" })
	@ApiDefaultActionResponse({
		description: "The role has been successfully disassociated."
	})
	async disassociate(
		@Param() params: DesassociateUserRoleParams
	): Promise<void> {
		await this.userService.disassociateRole(params.userId, params.roleId);
	}
}
