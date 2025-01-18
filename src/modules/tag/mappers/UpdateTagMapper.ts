import { Injectable } from "@nestjs/common";

import { UpdateTagRequest } from "../dtos/UpdateTagRequest";
import { Tag } from "../TagEntity";

@Injectable()
export class UpdateTagMapper {
	toEntity(dto: UpdateTagRequest): Tag {
		return this.copyToEntity(dto, new Tag());
	}

	copyToEntity(dto: UpdateTagRequest, entity: Tag): Tag {
		entity.name = dto.name;
		return entity;
	}
}
