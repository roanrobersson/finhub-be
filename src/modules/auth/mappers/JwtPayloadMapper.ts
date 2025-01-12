import { Injectable } from "@nestjs/common";

import { AuthUser } from "../dtos/AuthUser";
import { JwtPaylod } from "../dtos/JwtPaylod";

@Injectable()
export class JwtPayloadMapper {
	async toAuthUser(jwtDto: JwtPaylod): Promise<AuthUser> {
		return this.copyToAuthUser(jwtDto, new AuthUser());
	}

	async copyToAuthUser(
		jwtPayloadDto: JwtPaylod,
		dto: AuthUser
	): Promise<AuthUser> {
		dto.id = jwtPayloadDto.sub;
		dto.name = jwtPayloadDto.name;
		dto.email = jwtPayloadDto.username;
		dto.picture = jwtPayloadDto.picture;
		dto.roles = jwtPayloadDto.roles;
		dto.permissions = jwtPayloadDto.permissions;
		dto.isNewUser = false;
		return dto;
	}
}
