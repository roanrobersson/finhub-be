import { Inject, Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";

import { BaseRepository } from "../../core/BaseRepository";
import { Permission } from "./PermissionEntity";

@Injectable()
export class PermissionRepository extends BaseRepository<Permission> {
	constructor(@Inject(DataSource) readonly dataSource: DataSource) {
		super(Permission, dataSource);
	}
}
