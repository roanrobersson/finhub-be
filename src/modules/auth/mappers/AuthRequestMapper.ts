import { Injectable } from "@nestjs/common";

import { AuthUser } from "../dtos/AuthUser";
import { ProfileResponse } from "../dtos/ProfileResponse";

@Injectable()
export class AuthUserMapper {
	async toProfile(authUser: AuthUser): Promise<ProfileResponse> {
		return this.copyToProfile(authUser, new ProfileResponse());
	}

	async copyToProfile(
		authUser: AuthUser,
		dto: ProfileResponse
	): Promise<ProfileResponse> {
		dto.id = authUser.id;
		dto.name = authUser.name;
		dto.email = authUser.email;
		dto.picture = authUser.picture;
		dto.roles = authUser.roles;
		dto.permissions = authUser.permissions;
		return dto;
	}
}
