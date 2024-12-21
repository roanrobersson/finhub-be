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
import { Public } from "src/auth/auth.guard";

import { CreateUserDto } from "./dtos/create-user.dto";
import { FindOneParams } from "./dtos/params";
import { User } from "./user.entity";
import { UsersService } from "./users.service";

@ApiBearerAuth()
@Controller("users")
export class UsersController {
	@Inject(UsersService)
	private usersService: UsersService;

	@Public()
	@Post()
	@ApiOperation({ summary: "Create a new user" })
	create(@Body() createUserDto: CreateUserDto) {
		const user = new User();
		user.name = createUserDto.name;
		user.email = createUserDto.email;
		user.password = createUserDto.password;

		return this.usersService.create(user);
	}

	@Get()
	@ApiOperation({ summary: "List all users" })
	findAll() {
		return this.usersService.findAll();
	}

	@Get(":id")
	@ApiOperation({ summary: "Find a user by id" })
	findOne(@Param() params: FindOneParams) {
		return this.usersService.findOne(params.id);
	}

	@Delete(":id")
	@ApiOperation({ summary: "Remove a user by id" })
	remove(@Param() params: FindOneParams) {
		return this.usersService.delete(params.id);
	}
}
