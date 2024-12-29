import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Inject,
	Param,
	Post,
	Put
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { Public } from "src/modules/auth/AuthGuard";

import {
	ChangeUserPasswordBodyDto,
	ChangeUserPasswordParamsDto
} from "./dtos/changeUserPassword";
import {
	CreateUserBodyDto,
	CreateUserResponseDto
} from "./dtos/createUserDtos";
import { DeleteUserParams } from "./dtos/deleteUserDtos";
import { GetAllUsersResponseDto } from "./dtos/getAllUsersDtos";
import {
	GetUserByIdParams,
	GetUserByIdResponseDto
} from "./dtos/getUserByIdDtos";
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
	async getAll(): Promise<GetAllUsersResponseDto[]> {
		return this.userService.getAll();
	}

	@Get(":userId")
	@ApiOperation({ summary: "Find a user by id" })
	async getById(
		@Param() params: GetUserByIdParams
	): Promise<GetUserByIdResponseDto> {
		const user = await this.userService.getById(params.userId);
		// return plainToInstance(GetUserByIdResponseDto, user, {
		// 	excludeExtraneousValues: true
		// });
		return user;
	}

	@Public()
	@Post()
	@ApiOperation({ summary: "Create a new user" })
	async create(
		@Body() body: CreateUserBodyDto
	): Promise<CreateUserResponseDto> {
		let user = new User(body.name, body.email, body.password);
		user = await this.userService.save(user);
		// return plainToInstance(CreateUserResponseDto, user, {
		// 	excludeExtraneousValues: true
		// });
		return user;
	}

	@Put(":userId")
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiOperation({ summary: "Update a user by id" })
	async update(
		@Param() params: UpdateUserParamsDto,
		@Body() body: UpdateUserBodyDto
	): Promise<UpdateUserResponseDto> {
		let user = await this.userService.getById(params.userId);
		user.name = body.name;
		user = await this.userService.save(user);
		// return plainToInstance(UpdateUserResponseDto, user, {
		// 	excludeExtraneousValues: true
		// });
		return user;
	}

	@Put(":userId/change-password")
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiOperation({ summary: "Update a user by id" })
	async changePassword(
		@Param() params: ChangeUserPasswordParamsDto,
		@Body() body: ChangeUserPasswordBodyDto
	): Promise<void> {
		return this.userService.changePassword(
			params.userId,
			body.currentPassword,
			body.newPassword
		);
	}

	@Delete(":userId")
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiOperation({ summary: "Remove a user by id" })
	async remove(@Param() params: DeleteUserParams): Promise<void> {
		await this.userService.remove(params.userId);
	}
}
