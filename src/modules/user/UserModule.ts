import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CreateUserMapper } from "./mappers/CreateUserMapper";
import { GetAllUsersMapper } from "./mappers/GetAllUsersMapper";
import { GetUserByIdMapper } from "./mappers/GetUserByIdMapper";
import { UpdateUserMapper } from "./mappers/UpdateUserMapper";
import { UserController } from "./UserController";
import { User } from "./UserEntity";
import { UserRepository } from "./UserRepository";
import { UserService } from "./UserService";

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	controllers: [UserController],
	providers: [
		UserService,
		UserRepository,
		GetAllUsersMapper,
		GetUserByIdMapper,
		CreateUserMapper,
		GetUserByIdMapper,
		UpdateUserMapper
	],
	exports: [UserService, UserRepository]
})
export class UserModule {}
