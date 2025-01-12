import { Injectable } from "@nestjs/common";

import { RoleSimplifiedResponse } from "../dtos/RoleSimplifiedResponse";
import { Role } from "../RoleEntity";

@Injectable()
export class RoleSimplifiedResponseMapper {
	toResponse(entity: Role): RoleSimplifiedResponse {
		return this.copyToResponse(entity, new RoleSimplifiedResponse());
	}

	copyToResponse(
		entity: Role,
		dto: RoleSimplifiedResponse
	): RoleSimplifiedResponse {
		dto.id = entity.id;
		dto.name = entity.name;
		return dto;
	}
}
