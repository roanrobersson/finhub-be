import {
	Body,
	Controller,
	Delete,
	Get,
	Inject,
	Param,
	Post,
	Put
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { Public } from "src/modules/auth/AuthGuard";

import {
	CreateUserBodyDto,
	CreateUserResponseDto
} from "./dtos/createUserDtos";
import { DeleteUserParams } from "./dtos/deleteUserDtos";
import { GetAllUsersResponse } from "./dtos/getAllUsersDtos";
import { GetUserByIdParams, GetUserByIdResponse } from "./dtos/getUserByIdDtos";
import {
	UpdateUserBodyDto,
	UpdateUserParamsDto,
	UpdateUserResponseDto
} from "./dtos/updateUserDtos";
import { User } from "./UserEntity";
import { UserService } from "./UserService";

@ApiBearerAuth()
@Controller("users")
export class UserController {
	@Inject(UserService)
	private userService: UserService;

	@Get()
	@ApiOperation({ summary: "List all users" })
	async getAll(): Promise<GetAllUsersResponse[]> {
		return this.userService.getAll();
	}

	@Get(":userId")
	@ApiOperation({ summary: "Find a user by id" })
	async getById(
		@Param() params: GetUserByIdParams
	): Promise<GetUserByIdResponse> {
		return this.userService.getById(params.userId);
	}

	@Public()
	@Post()
	@ApiOperation({ summary: "Create a new user" })
	async create(
		@Body() body: CreateUserBodyDto
	): Promise<CreateUserResponseDto> {
		const user = new User(body.name, body.email, body.password);
		return this.userService.save(user);
	}

	@Put(":userId")
	@ApiOperation({ summary: "Update a user by id" })
	async update(
		@Param() params: UpdateUserParamsDto,
		@Body() body: UpdateUserBodyDto
	): Promise<UpdateUserResponseDto> {
		const user = await this.userService.getById(params.userId);
		user.name = body.name;
		return this.userService.save(user);
	}

	@Delete(":userId")
	@ApiOperation({ summary: "Remove a user by id" })
	async remove(@Param() params: DeleteUserParams): Promise<void> {
		return this.userService.remove(params.userId);
	}
}
