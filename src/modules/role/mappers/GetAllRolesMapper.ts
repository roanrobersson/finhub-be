import { Injectable } from "@nestjs/common";

import { GetAllRolesResponseDto } from "../dtos/getAllRolesDtos";
import { Role } from "../RoleEntity";

@Injectable()
export class GetAllRolesMapper {
	async toResponse(entities: Role[]): Promise<GetAllRolesResponseDto[]> {
		return entities.map((entity) => ({
			id: entity.id,
			name: entity.name
		}));
	}
}
