import { Injectable } from "@nestjs/common";

import { GetPermisssionByIdResponse } from "../dtos/getPermissionByIdDtos";
import { Permission } from "../PermissionEntity";

@Injectable()
export class GetPermissionByIdMapper {
	async toResponse(entity: Permission): Promise<GetPermisssionByIdResponse> {
		return this.copyToResponse(entity, new GetPermisssionByIdResponse());
	}

	async copyToResponse(
		entity: Permission,
		dto: GetPermisssionByIdResponse
	): Promise<GetPermisssionByIdResponse> {
		dto.id = entity.id;
		dto.name = entity.name;
		return dto;
	}
}
