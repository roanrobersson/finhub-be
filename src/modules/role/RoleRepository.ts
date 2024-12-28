import { Inject, Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";

import { BaseRepository } from "../../core/BaseRepository";
import { Role } from "./RoleEntity";

@Injectable()
export class RoleRepository extends BaseRepository<Role> {
	constructor(@Inject(DataSource) readonly dataSource: DataSource) {
		super(Role, dataSource);
	}

	async findByName(name: string): Promise<Role | null> {
		return this.findOneBy({ name });
	}
}
