import { Injectable } from "@nestjs/common";

import { CreateRoleRequest } from "../dtos/CreateRoleRequest";
import { Role } from "../RoleEntity";

@Injectable()
export class CreateRoleMapper {
	toEntity(dto: CreateRoleRequest): Role {
		return this.copyToEntity(dto, new Role());
	}

	copyToEntity(dto: CreateRoleRequest, entity: Role): Role {
		entity.name = dto.name;
		entity.description = dto.description;
		return entity;
	}
}
