import { Injectable } from "@nestjs/common";

import { User } from "../../user/UserEntity";
import { SignUpRequest } from "../dtos/SignUpRequest";

@Injectable()
export class SignUpMapper {
	toEntity(dto: SignUpRequest): User {
		return this.copyToEntity(dto, new User());
	}

	copyToEntity(dto: SignUpRequest, entity: User): User {
		entity.name = dto.name;
		entity.email = dto.email;
		entity.password = dto.password;
		entity.picture = dto.picture;
		return entity;
	}
}
