import { Injectable } from "@nestjs/common";

import { RoleResponse } from "../dtos/RoleResponse";
import { Role } from "../RoleEntity";

@Injectable()
export class RoleResponseMapper {
	async toResponse(entity: Role): Promise<RoleResponse> {
		return this.copyToResponse(entity, new RoleResponse());
	}

	async copyToResponse(entity: Role, dto: RoleResponse): Promise<RoleResponse> {
		const permissions = await entity.getPermissions();
		dto.id = entity.id;
		dto.name = entity.name;
		dto.description = entity.description;
		dto.permissions = permissions.map((permission) => ({
			id: permission.id,
			name: permission.name
		}));
		return dto;
	}
}
