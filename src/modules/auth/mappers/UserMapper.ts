import { Injectable } from "@nestjs/common";
import { User } from "src/modules/user/UserEntity";

import { AuthUser } from "../dtos/AuthUser";

@Injectable()
export class UserMapper {
	async toAuthUser(entity: User): Promise<AuthUser> {
		return this.copyToAuthUser(entity, new AuthUser());
	}

	async copyToAuthUser(entity: User, dto: AuthUser): Promise<AuthUser> {
		const roles = await entity.getRoles();
		const permissions = await entity.getPermissions();
		dto.id = entity.id;
		dto.name = entity.name;
		dto.email = entity.email;
		dto.picture = entity.picture;
		dto.roles = roles.map((role) => role.name);
		dto.permissions = permissions.map((permission) => permission.name);
		dto.isNewUser = false;
		return dto;
	}
}
