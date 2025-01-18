import { Inject, Injectable } from "@nestjs/common";
import { UniqueException } from "src/core/exceptions/UniqueException";
import { Transactional } from "typeorm-transactional";

import { UserService } from "../user/UserService";
import { TagNotFoundException } from "./exceptions/TagNotFoundException";
import { Tag } from "./TagEntity";
import { TagRepository } from "./TagRepository";

@Injectable()
export class TagService {
	@Inject()
	private tagRepository: TagRepository;

	@Inject()
	private userService: UserService;

	async getAll(userId: number): Promise<Tag[]> {
		return this.tagRepository.findBy({ userId });
	}

	async getById(id: number, userId: number): Promise<Tag> {
		const tag = await this.tagRepository.findOneBy({
			id,
			userId
		});
		if (!tag) {
			throw new TagNotFoundException(id);
		}
		return tag;
	}

	@Transactional()
	async save(tag: Tag): Promise<Tag> {
		await this.validateUniqueTag(tag);
		const user = await this.userService.getById(tag.userId);
		tag.user = Promise.resolve(user);
		return await this.tagRepository.save(tag);
	}

	async remove(id: number, userId: number): Promise<void> {
		const tag = await this.getById(id, userId);
		await this.tagRepository.remove(tag);
	}

	async validateUniqueTag(tag: Tag) {
		const isInsert = tag.isNew();
		const existingTag = await this.tagRepository.findOneBy({
			userId: tag.userId,
			name: tag.name
		});
		if (!existingTag) {
			return;
		}
		if (isInsert || existingTag.id !== tag.id) {
			throw new UniqueException(`Tag with name '${tag.name}' already exists`);
		}
	}
}
