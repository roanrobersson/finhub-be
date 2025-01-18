import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Inject,
	Param,
	Post,
	Put,
	Req
} from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import {
	ApiDefaultCreateResponse,
	ApiDefaultDeleteResponse,
	ApiDefaultGetAllResponse,
	ApiDefaultUpdateResponse
} from "src/core/decorators/ApiDefaultResponseDecorator";

import { AuthRequest } from "../auth/dtos/AuthRequest";
import { RequireSelf } from "../auth/RequireSelfDecorator";
import { CreateTagRequest } from "./dtos/CreateTagRequest";
import {
	CreateTagParams,
	DeleteTagParams,
	GetAllTagsParams,
	UpdateTagParams
} from "./dtos/params";
import { TagResponse } from "./dtos/TagResponse";
import { UpdateTagRequest } from "./dtos/UpdateTagRequest";
import { CreateTagMapper } from "./mappers/CreateTagMapper";
import { TagResponseMapper } from "./mappers/TagResponseMapper";
import { UpdateTagMapper } from "./mappers/UpdateTagMapper";
import { TagService } from "./TagService";

@Controller("users/:userId/tags")
export class TagController {
	@Inject()
	private tagService: TagService;

	@Inject()
	private createTagMapper: CreateTagMapper;

	@Inject()
	private updateTagMapper: UpdateTagMapper;

	@Inject()
	private tagResponseMapper: TagResponseMapper;

	@Get()
	@RequireSelf()
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: "List all tags" })
	@ApiDefaultGetAllResponse({
		type: TagResponse,
		isArray: true
	})
	async getAll(@Param() params: GetAllTagsParams): Promise<any> {
		const tags = await this.tagService.getAll(params.userId);
		return tags.map((tag) => this.tagResponseMapper.toResponse(tag));
	}

	@Post()
	@RequireSelf()
	@HttpCode(HttpStatus.CREATED)
	@ApiOperation({ summary: "Create a new tag" })
	@ApiDefaultCreateResponse({
		type: TagResponse
	})
	async create(
		@Param() params: CreateTagParams,
		@Body() body: CreateTagRequest
	): Promise<TagResponse> {
		let tag = this.createTagMapper.toEntity(body);
		tag.userId = params.userId;
		tag = await this.tagService.save(tag);
		return this.tagResponseMapper.toResponse(tag);
	}

	@Put(":tagId")
	@RequireSelf()
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: "Update a tag by id" })
	@ApiDefaultUpdateResponse({
		type: TagResponse
	})
	async update(
		@Param() params: UpdateTagParams,
		@Body() body: UpdateTagRequest
	): Promise<TagResponse> {
		let tag = await this.tagService.getById(params.tagId, params.userId);
		this.updateTagMapper.copyToEntity(body, tag);
		tag = await this.tagService.save(tag);
		return this.tagResponseMapper.toResponse(tag);
	}

	@Delete(":tagId")
	@RequireSelf()
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiOperation({ summary: "Remove a tag by id" })
	@ApiDefaultDeleteResponse()
	async remove(
		@Req() req: AuthRequest,
		@Param()
		params: DeleteTagParams
	): Promise<void> {
		await this.tagService.remove(params.tagId, params.userId);
	}
}
