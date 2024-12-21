import {
	Body,
	Controller,
	Delete,
	Get,
	Inject,
	Param,
	Post
} from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
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
	create(@Body() createUserDto: CreateUserDto) {
		const user = new User();
		user.name = createUserDto.name;
		user.email = createUserDto.email;
		user.password = createUserDto.password;

		return this.usersService.create(user);
	}

	@Get()
	findAll() {
		return this.usersService.findAll();
	}

	@Get(":id")
	findOne(@Param() params: FindOneParams) {
		return this.usersService.findOne(params.id);
	}

	@Delete(":id")
	remove(@Param() params: FindOneParams) {
		return this.usersService.delete(params.id);
	}
}
