import { Injectable } from "@nestjs/common";

import { GetAllUsersResponseDto } from "../dtos/getAllUsersDtos";
import { User } from "../UserEntity";

@Injectable()
export class GetAllUsersMapper {
	async toResponse(entities: User[]): Promise<GetAllUsersResponseDto[]> {
		return entities.map((entity) => ({
			id: entity.id,
			name: entity.name,
			email: entity.email,
			picture: entity.picture
		}));
	}
}
