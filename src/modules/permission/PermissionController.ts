import { Controller, Get, Inject, Param } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";

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
		const permissions = await this.permissionService.getAll();
		return plainToInstance(GetAllPermissionResponseDto, permissions, {
			excludeExtraneousValues: true
		});
	}

	@Get(":permissionId")
	@ApiOperation({ summary: "Find a permission by id" })
	@ApiResponse({ type: GetPermisssionByIdResponse })
	async getById(
		@Param() params: GetPermissionByIdParams
	): Promise<GetPermisssionByIdResponse> {
		const permission = await this.permissionService.getById(
			params.permissionId
		);
		return plainToInstance(GetPermisssionByIdResponse, permission, {
			excludeExtraneousValues: true
		});
	}
}
