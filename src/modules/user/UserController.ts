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
import { Public } from "src/core/decorators/PublicDecorator";
import { RoleEnum } from "src/core/enums/RoleEnum";
import { Roles } from "src/modules/auth/RolesDecorator";

import { ChangeUserPasswordRequest } from "./dtos/ChangeUserPasswordRequest";
import { CreateUserRequest } from "./dtos/CreateUserRequest";
import {
	ChangeUserPasswordParams,
	DeleteUserParams,
	GetUserByIdParams,
	UpdateUserParams
} from "./dtos/params";
import { UpdateUserRequest } from "./dtos/UpdateUserRequest";
import { UserResponse } from "./dtos/UserResponse";
import { UserSimplifiedResponse } from "./dtos/UserSimplifiedResponse";
import { CreateUserMapper } from "./mappers/CreateUserMapper";
import { UpdateUserMapper } from "./mappers/UpdateUserMapper";
import { UserResponseMapper } from "./mappers/UserResponseMapper";
import { UserSimplifiedResponseMapper } from "./mappers/UserSimplifiedResponseMapper";
import { UserService } from "./UserService";

@ApiBearerAuth()
@Controller("users")
export class UserController {
	@Inject(UserService)
	private userService: UserService;

	@Inject()
	private createUserMapper: CreateUserMapper;

	@Inject()
	private updateUserMapper: UpdateUserMapper;

	@Inject()
	private userResponseMapper: UserResponseMapper;

	@Inject()
	private userSimplifiedResponseMapper: UserSimplifiedResponseMapper;

	@Get()
	@Roles(RoleEnum.ADMIN)
	@ApiOperation({ summary: "List all users" })
	@ApiDefaultGetAllResponse({
		type: UserSimplifiedResponse,
		isArray: true
	})
	async getAll(): Promise<UserSimplifiedResponse[]> {
		const users = await this.userService.getAll();
		return users.map((user) =>
			this.userSimplifiedResponseMapper.toSimplifiedResponse(user)
		);
	}

	@Get(":userId")
	@ApiOperation({ summary: "Find a user by id" })
	@ApiDefaultGetByIdResponse({
		type: UserResponse
	})
	async getById(@Param() params: GetUserByIdParams): Promise<UserResponse> {
		const user = await this.userService.getById(params.userId);
		return this.userResponseMapper.toResponse(user);
	}

	@Post()
	@Public()
	@ApiOperation({ summary: "Create a new user" })
	@ApiDefaultCreateResponse({
		type: UserResponse,
		public: true
	})
	async create(@Body() body: CreateUserRequest): Promise<UserResponse> {
		let user = this.createUserMapper.toEntity(body);
		user = await this.userService.save(user);
		return this.userResponseMapper.toResponse(user);
	}

	@Put(":userId")
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: "Update a user by id" })
	@ApiDefaultUpdateResponse({
		type: UserResponse
	})
	async update(
		@Param() params: UpdateUserParams,
		@Body() body: UpdateUserRequest
	): Promise<UserResponse> {
		let user = await this.userService.getById(params.userId);
		this.updateUserMapper.copyToEntity(body, user);
		user = await this.userService.save(user);
		return this.userResponseMapper.toResponse(user);
	}

	@Put(":userId/change-password")
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiOperation({ summary: "Upddate a user password by id" })
	@ApiNoContentResponse({
		description: "The password has been successfully updated."
	})
	async changePassword(
		@Param() params: ChangeUserPasswordParams,
		@Body() body: ChangeUserPasswordRequest
	): Promise<void> {
		await this.userService.changePassword(
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
