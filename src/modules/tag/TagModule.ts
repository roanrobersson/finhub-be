import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserModule } from "../user/UserModule";
import { CreateTagMapper } from "./mappers/CreateTagMapper";
import { TagResponseMapper } from "./mappers/TagResponseMapper";
import { UpdateTagMapper } from "./mappers/UpdateTagMapper";
import { TagController } from "./TagController";
import { Tag } from "./TagEntity";
import { TagRepository } from "./TagRepository";
import { TagService } from "./TagService";

@Module({
	imports: [TypeOrmModule.forFeature([Tag]), UserModule],
	controllers: [TagController],
	providers: [
		TagService,

		TagRepository,

		CreateTagMapper,
		UpdateTagMapper,
		TagResponseMapper
	],
	exports: [TagService, CreateTagMapper, UpdateTagMapper, TagResponseMapper]
})
export class TagModule {}
