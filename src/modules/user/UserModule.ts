import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CreateUserMapper } from "./mappers/CreateUserMapper";
import { UpdateUserMapper } from "./mappers/UpdateUserMapper";
import { UserResponseMapper } from "./mappers/UserResponseMapper";
import { UserSimplifiedResponseMapper } from "./mappers/UserSimplifiedResponseMapper";
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
		CreateUserMapper,
		UpdateUserMapper,
		UserResponseMapper,
		UserSimplifiedResponseMapper
	],
	exports: [UserService, UserRepository]
})
export class UserModule {}
