import { Injectable } from "@nestjs/common";

import { UpdateRoleRequest } from "../dtos/UpdateRoleRequest";
import { Role } from "../RoleEntity";

@Injectable()
export class UpdateRoleMapper {
	toEntity(dto: UpdateRoleRequest): Role {
		return this.copyToEntity(dto, new Role());
	}

	copyToEntity(dto: UpdateRoleRequest, entity: Role): Role {
		entity.name = dto.name;
		entity.description = dto.description;
		return entity;
	}
}
