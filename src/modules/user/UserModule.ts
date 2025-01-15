import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { SignUpMapper } from "../auth/mappers/SignUpMapper";
import { RoleModule } from "../role/RoleModule";
import { UpdateUserMapper } from "./mappers/UpdateUserMapper";
import { UserResponseMapper } from "./mappers/UserResponseMapper";
import { UserSimplifiedResponseMapper } from "./mappers/UserSimplifiedResponseMapper";
import { UserController } from "./UserController";
import { User } from "./UserEntity";
import { UserRepository } from "./UserRepository";
import { UserRoleController } from "./UserRoleController";
import { UserService } from "./UserService";

@Module({
	imports: [RoleModule, TypeOrmModule.forFeature([User])],
	controllers: [UserController, UserRoleController],
	providers: [
		UserService,

		UserRepository,

		SignUpMapper,
		UpdateUserMapper,
		UserResponseMapper,
		UserSimplifiedResponseMapper
	],
	exports: [
		UserService,

		UserRepository,

		SignUpMapper,
		UpdateUserMapper,
		UserResponseMapper,
		UserSimplifiedResponseMapper
	]
})
export class UserModule {}
