import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Inject,
	Param,
	Put
} from "@nestjs/common";
import {
	ApiBearerAuth,
	ApiNoContentResponse,
	ApiOperation
} from "@nestjs/swagger";
import {
	ApiDefaultDeleteResponse,
	ApiDefaultGetAllResponse,
	ApiDefaultGetByIdResponse,
	ApiDefaultUpdateResponse
} from "src/core/decorators/ApiDefaultResponseDecorator";
import { RoleEnum } from "src/core/enums/RoleEnum";
import { RequireRoles } from "src/modules/auth/RequireRolesDecorator";

import { RequireSelf } from "../auth/RequireSelfDecorator";
import { ChangeUserPasswordRequest } from "./dtos/ChangeUserPasswordRequest";
import {
	ChangeUserPasswordParams,
	DeleteUserParams,
	GetUserByIdParams,
	UpdateUserParams
} from "./dtos/params";
import { UpdateUserRequest } from "./dtos/UpdateUserRequest";
import { UserResponse } from "./dtos/UserResponse";
import { UserSimplifiedResponse } from "./dtos/UserSimplifiedResponse";
import { UpdateUserMapper } from "./mappers/UpdateUserMapper";
import { UserResponseMapper } from "./mappers/UserResponseMapper";
import { UserSimplifiedResponseMapper } from "./mappers/UserSimplifiedResponseMapper";
import { UserService } from "./UserService";

@ApiBearerAuth()
@Controller("users")
export class UserController {
	@Inject()
	private userService: UserService;

	@Inject()
	private updateUserMapper: UpdateUserMapper;

	@Inject()
	private userResponseMapper: UserResponseMapper;

	@Inject()
	private userSimplifiedResponseMapper: UserSimplifiedResponseMapper;

	@Get()
	@RequireRoles(RoleEnum.ADMIN)
	@HttpCode(HttpStatus.OK)
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
	@RequireSelf()
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: "Find a user by id" })
	@ApiDefaultGetByIdResponse({
		type: UserResponse
	})
	async getById(@Param() params: GetUserByIdParams): Promise<UserResponse> {
		const user = await this.userService.getById(params.userId);
		return this.userResponseMapper.toResponse(user);
	}

	@Put(":userId")
	@RequireSelf()
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
	@RequireSelf()
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
	@RequireRoles(RoleEnum.ADMIN)
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiOperation({ summary: "Remove a user by id" })
	@ApiDefaultDeleteResponse()
	async remove(@Param() params: DeleteUserParams): Promise<void> {
		await this.userService.remove(params.userId);
	}
}
