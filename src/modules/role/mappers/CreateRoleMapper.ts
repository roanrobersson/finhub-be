import { Injectable } from "@nestjs/common";

import {
	CreateRoleBodyDto,
	CreateRoleResponseDto
} from "../dtos/createRoleDtos";
import { Role } from "../RoleEntity";

@Injectable()
export class CreateRoleMapper {
	async toEntity(dto: CreateRoleBodyDto): Promise<Role> {
		return this.copyToEntity(dto, new Role());
	}

	async copyToEntity(dto: CreateRoleBodyDto, entity: Role): Promise<Role> {
		entity.name = dto.name;
		entity.description = dto.description;
		return entity;
	}

	async toResponse(entity: Role): Promise<CreateRoleResponseDto> {
		return this.copyToResponse(entity, new CreateRoleResponseDto());
	}

	async copyToResponse(
		entity: Role,
		dto: CreateRoleResponseDto
	): Promise<CreateRoleResponseDto> {
		const permissions = await entity.getPermissions();
		dto.id = entity.id;
		dto.name = entity.name;
		dto.description = entity.description;
		dto.permissions = permissions.map((permission) => ({
			id: permission.id,
			name: permission.name
		}));
		return dto;
	}
}
