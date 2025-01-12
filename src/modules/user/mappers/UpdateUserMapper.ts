import { Injectable } from "@nestjs/common";

import { UpdateUserRequest } from "../dtos/UpdateUserRequest";
import { User } from "../UserEntity";

@Injectable()
export class UpdateUserMapper {
	toEntity(dto: UpdateUserRequest): User {
		return this.copyToEntity(dto, new User());
	}

	copyToEntity(dto: UpdateUserRequest, entity: User): User {
		entity.name = dto.name;
		entity.picture = dto.picture;
		return entity;
	}
}
