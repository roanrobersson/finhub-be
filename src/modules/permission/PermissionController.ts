import {
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Inject,
	Param
} from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import {
	ApiDefaultGetAllResponse,
	ApiDefaultGetByIdResponse
} from "src/core/decorators/ApiDefaultResponseDecorator";

import { GetPermissionByIdParams } from "./dtos/params";
import { PermisssionResponse } from "./dtos/PermisssionResponse";
import { PermissionResponseMapper } from "./mappers/PermissionResponseMapper";
import { PermissionService } from "./PermissionService";

@Controller("permissions")
export class PermissionController {
	@Inject()
	private permissionService: PermissionService;

	@Inject()
	private permissionResponseMapper: PermissionResponseMapper;

	@Get()
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: "List all permissions" })
	@ApiDefaultGetAllResponse({
		type: PermisssionResponse,
		isArray: true
	})
	async getAll(): Promise<PermisssionResponse[]> {
		const permissions = await this.permissionService.getAll();
		return permissions.map((permission) =>
			this.permissionResponseMapper.toResponse(permission)
		);
	}

	@Get(":permissionId")
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: "Find a permission by id" })
	@ApiResponse({ type: PermisssionResponse })
	@ApiDefaultGetByIdResponse({
		type: PermisssionResponse
	})
	async getById(
		@Param() params: GetPermissionByIdParams
	): Promise<PermisssionResponse> {
		const permission = await this.permissionService.getById(
			params.permissionId
		);
		return this.permissionResponseMapper.toResponse(permission);
	}
}
