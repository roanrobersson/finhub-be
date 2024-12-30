import { Injectable } from "@nestjs/common";

import { GetUserByIdResponseDto } from "../dtos/getUserByIdDtos";
import { User } from "../UserEntity";

@Injectable()
export class GetUserByIdMapper {
	async toResponse(entity: User): Promise<GetUserByIdResponseDto> {
		return this.copyToResponse(entity, new GetUserByIdResponseDto());
	}

	async copyToResponse(
		entity: User,
		dto: GetUserByIdResponseDto
	): Promise<GetUserByIdResponseDto> {
		const roles = await entity.getRoles();
		const permissions = await entity.getPermissions();
		dto.id = entity.id;
		dto.name = entity.name;
		dto.email = entity.email;
		dto.roles = roles.map((role) => ({
			id: role.id,
			name: role.name
		}));
		dto.permissions = permissions.map((permission) => ({
			id: permission.id,
			name: permission.name
		}));
		return dto;
	}
}
