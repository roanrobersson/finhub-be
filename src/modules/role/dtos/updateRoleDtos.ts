import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Id } from "src/core/decorators/IdDecorator";

export class UpdateRoleParamsDto {
	@Id()
	@ApiProperty({
		description: "The id of the role",
		example: 1
	})
	roleId: number;
}

export class UpdateRoleBodyDto {
	@IsNotEmpty()
	@ApiProperty({
		description: "The name of the role",
		example: "admin"
	})
	name: string;

	@IsNotEmpty()
	@ApiProperty({
		description: "The description of the role",
		example: "Administrator"
	})
	description: string;
}

export class UpdateRoleResponseDto {
	id: number;
	name: string;
	description: string;
}
