import { Injectable } from "@nestjs/common";

import { TagResponse } from "../dtos/TagResponse";
import { Tag } from "../TagEntity";

@Injectable()
export class TagResponseMapper {
	toResponse(entity: Tag): TagResponse {
		return this.copyToResponse(entity, new TagResponse());
	}

	copyToResponse(entity: Tag, dto: TagResponse): TagResponse {
		dto.id = entity.id;
		dto.name = entity.name;
		return dto;
	}
}
