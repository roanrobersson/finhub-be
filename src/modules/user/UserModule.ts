import { Module } from "@nestjs/common";
import { DrizzleModule } from "database/DrizzleModule";

import { UserController } from "./UserController";
import { UserRepository } from "./UserRepository";
import { UserService } from "./UserService";

@Module({
	imports: [DrizzleModule],
	controllers: [UserController],
	providers: [UserService, UserRepository],
	exports: [UserService]
})
export class UserModule {}
