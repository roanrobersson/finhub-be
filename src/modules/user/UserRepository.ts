import { Inject, Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";

import { BaseRepository } from "../../core/BaseRepository";
import { User } from "./UserEntity";

@Injectable()
export class UserRepository extends BaseRepository<User> {
	constructor(@Inject(DataSource) readonly dataSource: DataSource) {
		super(User, dataSource);
	}
}
