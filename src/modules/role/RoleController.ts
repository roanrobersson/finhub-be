import {
	Body,
	Controller,
	Delete,
	Get,
	Inject,
	Param,
	Post,
	Put
} from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";

import {
	CreateRoleBodyDto,
	CreateRoleResponseDto
} from "./dtos/createRoleDtos";
import { DeleteRoleParams } from "./dtos/deleteRoleDtos";
import { GetAllRolesResponseDto } from "./dtos/getAllRolesDtos";
import {
	GetRoleByIdParamsDto,
	GetRoleByIdResponseDto
} from "./dtos/getRoleByIdDtos";
import {
	UpdateRoleBodyDto,
	UpdateRoleParamsDto,
	UpdateRoleResponseDto
} from "./dtos/updateRoleDtos";
import { Role } from "./RoleEntity";
import { RoleService } from "./RoleService";

@Controller("roles")
export class RoleController {
	@Inject()
	private roleService: RoleService;

	@Get()
	@ApiOperation({ summary: "List all roles" })
	async getAll(): Promise<GetAllRolesResponseDto[]> {
		return this.roleService.getAll();
	}

	@Get(":roleId")
	@ApiOperation({ summary: "Find a role by id" })
	asyncgetById(
		@Param() params: GetRoleByIdParamsDto
	): Promise<GetRoleByIdResponseDto> {
		return this.roleService.getById(params.roleId);
	}

	@Post()
	@ApiOperation({ summary: "Create a new role" })
	async create(
		@Body() body: CreateRoleBodyDto
	): Promise<CreateRoleResponseDto> {
		const role = new Role(body.name, body.description);
		return this.roleService.save(role);
	}

	@Put(":roleId")
	@ApiOperation({ summary: "Update a role by id" })
	async update(
		@Param() params: UpdateRoleParamsDto,
		@Body() body: UpdateRoleBodyDto
	): Promise<UpdateRoleResponseDto> {
		const role = await this.roleService.getById(params.roleId);
		role.name = body.name;
		role.description = body.description;
		return this.roleService.save(role);
	}

	@Delete(":roleId")
	@ApiOperation({ summary: "Remove a role by id" })
	async remove(
		@Param()
		params: DeleteRoleParams
	): Promise<void> {
		return this.roleService.remove(params.roleId);
	}
}
