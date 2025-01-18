import { Injectable } from "@nestjs/common";

import { CreateTagRequest } from "../dtos/CreateTagRequest";
import { Tag } from "../TagEntity";

@Injectable()
export class CreateTagMapper {
	toEntity(dto: CreateTagRequest): Tag {
		return this.copyToEntity(dto, new Tag());
	}

	copyToEntity(dto: CreateTagRequest, entity: Tag): Tag {
		entity.name = dto.name;
		return entity;
	}
}
