import {
	Body,
	Controller,
	Delete,
	Get,
	Inject,
	Param,
	Post
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { Public } from "src/modules/auth/AuthGuard";

import { CreateUserDto } from "./dtos/CreateUserDto";
import { FindOneParams } from "./dtos/params";
import { User } from "./UserEntity";
import { UserService } from "./UserService";

@ApiBearerAuth()
@Controller("users")
export class UserController {
	@Inject(UserService)
	private userService: UserService;

	@Public()
	@Post()
	@ApiOperation({ summary: "Create a new user" })
	create(@Body() createUserDto: CreateUserDto) {
		const user = new User();
		user.name = createUserDto.name;
		user.email = createUserDto.email;
		user.password = createUserDto.password;

		return this.userService.create(user);
	}

	@Get()
	@ApiOperation({ summary: "List all users" })
	findAll() {
		return this.userService.findAll();
	}

	@Get(":id")
	@ApiOperation({ summary: "Find a user by id" })
	findOne(@Param() params: FindOneParams) {
		return this.userService.findOne(params.id);
	}

	@Delete(":id")
	@ApiOperation({ summary: "Remove a user by id" })
	remove(@Param() params: FindOneParams) {
		return this.userService.delete(params.id);
	}
}
