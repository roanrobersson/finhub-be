import { Injectable } from "@nestjs/common";

import {
	UpdateUserBodyDto,
	UpdateUserResponseDto
} from "../dtos/updateUserDtos";
import { User } from "../UserEntity";

@Injectable()
export class UpdateUserMapper {
	async toEntity(dto: UpdateUserBodyDto): Promise<User> {
		return this.copyToEntity(dto, new User());
	}

	async copyToEntity(dto: UpdateUserBodyDto, entity: User): Promise<User> {
		entity.name = dto.name;
		entity.picture = dto.picture;
		return entity;
	}

	async toResponse(entity: User): Promise<UpdateUserResponseDto> {
		return this.copyToResponse(entity, new UpdateUserResponseDto());
	}

	async copyToResponse(
		entity: User,
		dto: UpdateUserResponseDto
	): Promise<UpdateUserResponseDto> {
		const roles = await entity.getRoles();
		const permissions = await entity.getPermissions();
		dto.id = entity.id;
		dto.name = entity.name;
		dto.email = entity.email;
		dto.picture = entity.picture;
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
