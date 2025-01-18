import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Inject,
	Param,
	Post,
	Put
} from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import {
	ApiDefaultCreateResponse,
	ApiDefaultDeleteResponse,
	ApiDefaultGetAllResponse,
	ApiDefaultGetByIdResponse,
	ApiDefaultUpdateResponse
} from "src/core/decorators/ApiDefaultResponseDecorator";
import { RoleEnum } from "src/core/enums/RoleEnum";

import { Roles } from "../auth/RolesDecorator";
import { CreateRoleRequest } from "./dtos/CreateRoleRequest";
import {
	DeleteRoleParams,
	GetRoleByIdParams,
	GetRoleByNameParams,
	UpdateRoleParams
} from "./dtos/params";
import { RoleResponse } from "./dtos/RoleResponse";
import { RoleSimplifiedResponse } from "./dtos/RoleSimplifiedResponse";
import { UpdateRoleRequest } from "./dtos/UpdateRoleRequest";
import { CreateRoleMapper } from "./mappers/CreateRoleMapper";
import { RoleResponseMapper } from "./mappers/RoleResponseMapper";
import { RoleSimplifiedResponseMapper } from "./mappers/RoleSimplifiedResponseMapper";
import { UpdateRoleMapper } from "./mappers/UpdateRoleMapper";
import { RoleService } from "./RoleService";

@Controller("roles")
export class RoleController {
	@Inject()
	private roleService: RoleService;

	@Inject()
	private createRoleMapper: CreateRoleMapper;

	@Inject()
	private updateRoleMapper: UpdateRoleMapper;

	@Inject()
	private roleResponseMapper: RoleResponseMapper;

	@Inject()
	private roleSimplifiedResponseMapper: RoleSimplifiedResponseMapper;

	@Get()
	@ApiOperation({ summary: "List all roles" })
	@ApiDefaultGetAllResponse({
		type: RoleResponse,
		isArray: true
	})
	async getAll(): Promise<RoleSimplifiedResponse[]> {
		const roles = await this.roleService.getAll();
		return roles.map((role) =>
			this.roleSimplifiedResponseMapper.toResponse(role)
		);
	}

	@Get(":roleId")
	@ApiOperation({ summary: "Find a role by id" })
	@ApiDefaultGetByIdResponse({
		type: RoleResponse
	})
	async getById(@Param() params: GetRoleByIdParams): Promise<RoleResponse> {
		const role = await this.roleService.getById(params.roleId);
		return this.roleResponseMapper.toResponse(role);
	}

	@Get("name/:name")
	@ApiOperation({ summary: "Find a role by name" })
	@ApiDefaultGetByIdResponse({
		type: RoleResponse
	})
	async getByName(@Param() params: GetRoleByNameParams): Promise<RoleResponse> {
		const role = await this.roleService.getByName(params.name);
		return this.roleResponseMapper.toResponse(role);
	}

	@Post()
	@Roles(RoleEnum.ADMIN)
	@ApiOperation({ summary: "Create a new role" })
	@ApiDefaultCreateResponse({
		type: RoleResponse
	})
	async create(@Body() body: CreateRoleRequest): Promise<RoleResponse> {
		let role = this.createRoleMapper.toEntity(body);
		role = await this.roleService.save(role);
		return this.roleResponseMapper.toResponse(role);
	}

	@Put(":roleId")
	@Roles(RoleEnum.ADMIN)
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: "Update a role by id" })
	@ApiDefaultUpdateResponse({
		type: RoleResponse
	})
	async update(
		@Param() params: UpdateRoleParams,
		@Body() body: UpdateRoleRequest
	): Promise<RoleResponse> {
		let role = await this.roleService.getById(params.roleId);
		this.updateRoleMapper.copyToEntity(body, role);
		role = await this.roleService.save(role);
		return this.roleResponseMapper.toResponse(role);
	}

	@Delete(":roleId")
	@Roles(RoleEnum.ADMIN)
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiOperation({ summary: "Remove a role by id" })
	@ApiDefaultDeleteResponse()
	async remove(
		@Param()
		params: DeleteRoleParams
	): Promise<void> {
		await this.roleService.remove(params.roleId);
	}
}
