import { Injectable } from "@nestjs/common";

import { UserSimplifiedResponse } from "../dtos/UserSimplifiedResponse";
import { User } from "../UserEntity";

@Injectable()
export class UserSimplifiedResponseMapper {
	toSimplifiedResponse(entity: User): UserSimplifiedResponse {
		return this.copyToSimplifiedResponse(entity, new UserSimplifiedResponse());
	}

	copyToSimplifiedResponse(
		entity: User,
		dto: UserSimplifiedResponse
	): UserSimplifiedResponse {
		dto.id = entity.id;
		dto.name = entity.name;
		dto.email = entity.email;
		dto.picture = entity.picture;
		return dto;
	}
}
