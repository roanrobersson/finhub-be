import { Controller, Get, Inject, Param } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

import { GetAllPermissionResponseDto } from "./dtos/getAllPermissionsDtos";
import {
	GetPermissionByIdParams,
	GetPermisssionByIdResponse
} from "./dtos/getPermissionByIdDtos";
import { PermissionService } from "./PermissionService";

@Controller("permissions")
export class PermissionController {
	@Inject()
	private permissionService: PermissionService;

	@Get()
	@ApiOperation({ summary: "List all permissions" })
	async getAll(): Promise<GetAllPermissionResponseDto[]> {
		return this.permissionService.getAll();
	}

	@Get(":permissionId")
	@ApiOperation({ summary: "Find a permission by id" })
	@ApiResponse({ type: GetPermisssionByIdResponse })
	async getById(
		@Param() params: GetPermissionByIdParams
	): Promise<GetPermisssionByIdResponse> {
		return this.permissionService.getById(params.permissionId);
	}
}
