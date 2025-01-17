import { ApiProperty } from "@nestjs/swagger";
import { IsId } from "src/core/decorators/IsIdDecorator";

export class GetUserByIdParams {
	@IsId()
	@ApiProperty({
		description: "The id of the user",
		example: 1
	})
	userId: number;
}

export class UpdateUserParams {
	@IsId()
	@ApiProperty({
		description: "The id of the user",
		example: 1
	})
	userId: number;
}

export class DeleteUserParams {
	@IsId()
	@ApiProperty({
		description: "The id of the user",
		example: 1
	})
	userId: number;
}

export class ChangeUserPasswordParams {
	@IsId()
	@ApiProperty({
		description: "The id of the user",
		example: 1
	})
	userId: number;
}

export class AssociateUserRoleParams {
	@IsId()
	@ApiProperty({
		description: "The id of the user",
		example: 1
	})
	userId: number;

	@IsId()
	@ApiProperty({
		description: "The id of the role",
		example: 1
	})
	roleId: number;
}

export class DesassociateUserRoleParams {
	@IsId()
	@ApiProperty({
		description: "The id of the user",
		example: 1
	})
	userId: number;

	@IsId()
	@ApiProperty({
		description: "The id of the role",
		example: 1
	})
	roleId: number;
}
