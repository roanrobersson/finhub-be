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
import {
	ApiBearerAuth,
	ApiNoContentResponse,
	ApiOperation
} from "@nestjs/swagger";
import {
	ApiDefaultCreateResponse,
	ApiDefaultDeleteResponse,
	ApiDefaultGetAllResponse,
	ApiDefaultGetByIdResponse,
	ApiDefaultUpdateResponse
} from "src/core/decorators/ApiDefaultResponseDecorator";
import { RoleEnum } from "src/core/enums/RoleEnum";
import { Public } from "src/modules/auth/AuthGuard";
import { Roles } from "src/modules/auth/RolesDecorator";

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
	@Roles(RoleEnum.ADMIN)
	@ApiOperation({ summary: "List all users" })
	@ApiDefaultGetAllResponse({
		type: GetAllUsersResponseDto,
		isArray: true
	})
	async getAll(): Promise<GetAllUsersResponseDto[]> {
		return this.userService.getAll();
	}

	@Get(":userId")
	@ApiOperation({ summary: "Find a user by id" })
	@ApiDefaultGetByIdResponse({
		type: GetUserByIdResponseDto
	})
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
	@ApiDefaultCreateResponse({
		type: CreateUserBodyDto,
		public: true
	})
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
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: "Update a user by id" })
	@ApiDefaultUpdateResponse({
		type: CreateUserBodyDto
	})
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
	@ApiOperation({ summary: "Upddate a user password by id" })
	@ApiNoContentResponse({
		description: "The password has been successfully updated."
	})
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
	@Roles(RoleEnum.ADMIN)
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiOperation({ summary: "Remove a user by id" })
	@ApiDefaultDeleteResponse()
	async remove(@Param() params: DeleteUserParams): Promise<void> {
		await this.userService.remove(params.userId);
	}
}
