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
	@ApiDefaultGetAllResponse({
		type: GetAllRolesResponseDto,
		isArray: true
	})
	async getAll(): Promise<GetAllRolesResponseDto[]> {
		const roles = await this.roleService.getAll();
		// return plainToInstance(GetAllRolesResponseDto, roles, {
		// 	excludeExtraneousValues: true
		// });
		return roles;
	}

	@Get(":roleId")
	@ApiOperation({ summary: "Find a role by id" })
	@ApiDefaultGetByIdResponse({
		type: GetRoleByIdResponseDto
	})
	async getById(
		@Param() params: GetRoleByIdParamsDto
	): Promise<GetRoleByIdResponseDto> {
		const role = await this.roleService.getById(params.roleId);
		// return plainToInstance(GetRoleByIdResponseDto, role, {
		// 	excludeExtraneousValues: true
		// });
		return role;
	}

	@Post()
	@Roles(RoleEnum.ADMIN)
	@ApiOperation({ summary: "Create a new role" })
	@ApiDefaultCreateResponse({
		type: CreateRoleResponseDto
	})
	async create(
		@Body() body: CreateRoleBodyDto
	): Promise<CreateRoleResponseDto> {
		let role = new Role(body.name, body.description);
		role = await this.roleService.save(role);
		// return plainToInstance(CreateRoleResponseDto, role, {
		// 	excludeExtraneousValues: true
		// });
		return role;
	}

	@Put(":roleId")
	@Roles(RoleEnum.ADMIN)
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: "Update a role by id" })
	@ApiDefaultUpdateResponse({
		type: UpdateRoleResponseDto
	})
	async update(
		@Param() params: UpdateRoleParamsDto,
		@Body() body: UpdateRoleBodyDto
	): Promise<UpdateRoleResponseDto> {
		let role = await this.roleService.getById(params.roleId);
		role.name = body.name;
		role.description = body.description;
		role = await this.roleService.save(role);
		// return plainToInstance(UpdateRoleResponseDto, role, {
		// 	excludeExtraneousValues: true
		// });
		return role;
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
