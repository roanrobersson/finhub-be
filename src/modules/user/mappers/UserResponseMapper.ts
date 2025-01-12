import { Injectable } from "@nestjs/common";

import { UserResponse } from "../dtos/UserResponse";
import { User } from "../UserEntity";

@Injectable()
export class UserResponseMapper {
	async toResponse(entity: User): Promise<UserResponse> {
		return this.copyToResponse(entity, new UserResponse());
	}

	async copyToResponse(entity: User, dto: UserResponse): Promise<UserResponse> {
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
