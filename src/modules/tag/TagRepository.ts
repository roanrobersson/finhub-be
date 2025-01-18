import { Inject, Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";

import { BaseRepository } from "../../core/BaseRepository";
import { Tag } from "./TagEntity";

@Injectable()
export class TagRepository extends BaseRepository<Tag> {
	constructor(@Inject(DataSource) readonly dataSource: DataSource) {
		super(Tag, dataSource);
	}

	async findByName(name: string): Promise<Tag | null> {
		return this.findOneBy({ name });
	}
}
