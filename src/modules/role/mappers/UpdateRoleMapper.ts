import { Injectable } from "@nestjs/common";

import {
	UpdateRoleBodyDto,
	UpdateRoleResponseDto
} from "../dtos/updateRoleDtos";
import { Role } from "../RoleEntity";

@Injectable()
export class UpdateRoleMapper {
	async toEntity(dto: UpdateRoleBodyDto): Promise<Role> {
		return this.copyToEntity(dto, new Role());
	}

	async copyToEntity(dto: UpdateRoleBodyDto, entity: Role): Promise<Role> {
		entity.name = dto.name;
		entity.description = dto.description;
		return entity;
	}

	async toResponse(entity: Role): Promise<UpdateRoleResponseDto> {
		return this.copyToResponse(entity, new UpdateRoleResponseDto());
	}

	async copyToResponse(
		entity: Role,
		dto: UpdateRoleResponseDto
	): Promise<UpdateRoleResponseDto> {
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
