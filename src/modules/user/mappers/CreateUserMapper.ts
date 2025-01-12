import { Injectable } from "@nestjs/common";

import { CreateUserRequest } from "../dtos/CreateUserRequest";
import { User } from "../UserEntity";

@Injectable()
export class CreateUserMapper {
	toEntity(dto: CreateUserRequest): User {
		return this.copyToEntity(dto, new User());
	}

	copyToEntity(dto: CreateUserRequest, entity: User): User {
		entity.name = dto.name;
		entity.email = dto.email;
		entity.password = dto.password;
		entity.picture = dto.picture;
		return entity;
	}
}
