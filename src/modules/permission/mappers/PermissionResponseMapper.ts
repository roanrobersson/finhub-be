import { Injectable } from "@nestjs/common";

import { PermisssionResponse } from "../dtos/PermisssionResponse";
import { Permission } from "../PermissionEntity";

@Injectable()
export class PermissionResponseMapper {
	toResponse(entity: Permission): PermisssionResponse {
		return this.copyToResponse(entity, new PermisssionResponse());
	}

	copyToResponse(
		entity: Permission,
		dto: PermisssionResponse
	): PermisssionResponse {
		dto.id = entity.id;
		dto.name = entity.name;
		return dto;
	}
}
