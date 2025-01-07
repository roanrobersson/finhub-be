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

import {
	ChangeUserPasswordBodyDto,
	ChangeUserPasswordParamsDto
} from "./dtos/changeUserPasswordDtos";
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
import { CreateUserMapper } from "./mappers/CreateUserMapper";
import { GetAllUsersMapper } from "./mappers/GetAllUsersMapper";
import { GetUserByIdMapper } from "./mappers/GetUserByIdMapper";
import { UpdateUserMapper } from "./mappers/UpdateUserMapper";
import { UserService } from "./UserService";

@ApiBearerAuth()
@Controller("users")
export class UserController {
	@Inject(UserService)
	private userService: UserService;

	@Inject(GetAllUsersMapper)
	private getAllUsersMapper: GetAllUsersMapper;

	@Inject(GetUserByIdMapper)
	private getUserByIdMapper: GetUserByIdMapper;

	@Inject(CreateUserMapper)
	private createUserMapper: CreateUserMapper;

	@Inject(UpdateUserMapper)
	private udateUserMapper: UpdateUserMapper;

	@Get()
	@Roles(RoleEnum.ADMIN)
	@ApiOperation({ summary: "List all users" })
	@ApiDefaultGetAllResponse({
		type: GetAllUsersResponseDto,
		isArray: true
	})
	async getAll(): Promise<GetAllUsersResponseDto[]> {
		const users = await this.userService.getAll();
		return this.getAllUsersMapper.toResponse(users);
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
		return this.getUserByIdMapper.toResponse(user);
	}

	@Post()
	@Public()
	@ApiOperation({ summary: "Create a new user" })
	@ApiDefaultCreateResponse({
		type: CreateUserBodyDto,
		public: true
	})
	async create(
		@Body() body: CreateUserBodyDto
	): Promise<CreateUserResponseDto> {
		let user = await this.createUserMapper.toEntity(body);
		user = await this.userService.save(user);
		return this.createUserMapper.toResponse(user);
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
		await this.udateUserMapper.copyToEntity(body, user);
		user = await this.userService.save(user);
		return this.udateUserMapper.toResponse(user);
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
