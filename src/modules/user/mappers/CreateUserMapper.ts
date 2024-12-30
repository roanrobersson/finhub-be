import { Injectable } from "@nestjs/common";

import {
	CreateUserBodyDto,
	CreateUserResponseDto
} from "../dtos/createUserDtos";
import { User } from "../UserEntity";

@Injectable()
export class CreateUserMapper {
	async toEntity(dto: CreateUserBodyDto): Promise<User> {
		return this.copyToEntity(dto, new User());
	}

	async copyToEntity(dto: CreateUserBodyDto, entity: User): Promise<User> {
		entity.name = dto.name;
		entity.email = dto.email;
		entity.password = dto.password;
		return entity;
	}

	async toResponse(entity: User): Promise<CreateUserResponseDto> {
		return this.copyToResponse(entity, new CreateUserResponseDto());
	}

	async copyToResponse(
		entity: User,
		dto: CreateUserResponseDto
	): Promise<CreateUserResponseDto> {
		const roles = await entity.getRoles();
		const permissions = await entity.getPermissions();
		dto.id = entity.id;
		dto.name = entity.name;
		dto.email = entity.email;
		dto.roles = dto.roles = roles.map((role) => ({
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
