import { Controller, Get, Inject, Param } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import {
	ApiDefaultGetAllResponse,
	ApiDefaultGetByIdResponse
} from "src/core/decorators/ApiDefaultResponseDecorator";

import { GetAllPermissionsResponseDto } from "./dtos/getAllPermissionsDtos";
import {
	GetPermissionByIdParams,
	GetPermisssionByIdResponse
} from "./dtos/getPermissionByIdDtos";
import { GetAllPermissionsMapper } from "./mappers/GetAllPermissionMapper";
import { GetPermissionByIdMapper } from "./mappers/GetPermissionByIdMapper";
import { PermissionService } from "./PermissionService";

@Controller("permissions")
export class PermissionController {
	@Inject()
	private permissionService: PermissionService;

	@Inject()
	private getAllPermissionsMapper: GetAllPermissionsMapper;

	@Inject()
	private getPermissionByIdMapper: GetPermissionByIdMapper;

	@Get()
	@ApiOperation({ summary: "List all permissions" })
	@ApiDefaultGetAllResponse({
		type: GetAllPermissionsResponseDto,
		isArray: true
	})
	async getAll(): Promise<GetAllPermissionsResponseDto[]> {
		const permissions = await this.permissionService.getAll();
		return await this.getAllPermissionsMapper.toResponse(permissions);
	}

	@Get(":permissionId")
	@ApiOperation({ summary: "Find a permission by id" })
	@ApiResponse({ type: GetPermisssionByIdResponse })
	@ApiDefaultGetByIdResponse({
		type: GetPermisssionByIdResponse
	})
	async getById(
		@Param() params: GetPermissionByIdParams
	): Promise<GetPermisssionByIdResponse> {
		const permission = await this.permissionService.getById(
			params.permissionId
		);
		return await this.getPermissionByIdMapper.toResponse(permission);
	}
}
