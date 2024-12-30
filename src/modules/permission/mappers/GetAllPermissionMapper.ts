import { Injectable } from "@nestjs/common";

import { GetAllPermissionsResponseDto } from "../dtos/getAllPermissionsDtos";
import { Permission } from "../PermissionEntity";

@Injectable()
export class GetAllPermissionsMapper {
	async toResponse(
		entities: Permission[]
	): Promise<GetAllPermissionsResponseDto[]> {
		return entities.map((entity) => ({
			id: entity.id,
			name: entity.name
		}));
	}
}
