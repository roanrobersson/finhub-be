import { Injectable } from "@nestjs/common";

import { GetRoleByIdResponseDto } from "../dtos/getRoleByIdDtos";
import { Role } from "../RoleEntity";

@Injectable()
export class GetRoleByIdMapper {
	async toResponse(entity: Role): Promise<GetRoleByIdResponseDto> {
		return this.copyToResponse(entity, new GetRoleByIdResponseDto());
	}

	async copyToResponse(
		entity: Role,
		dto: GetRoleByIdResponseDto
	): Promise<GetRoleByIdResponseDto> {
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
