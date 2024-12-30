import { ApiProperty } from "@nestjs/swagger";
import { IsId } from "src/core/decorators/IsIdDecorator";

export class GetRoleByIdParamsDto {
	@IsId()
	@ApiProperty({
		description: "The id of the role",
		example: 1
	})
	roleId: number;
}

export class GetRoleByIdResponseDto {
	@ApiProperty({
		description: "The id of the role",
		example: 1
	})
	id: number;

	@ApiProperty({
		description: "The name of the role",
		example: "admin"
	})
	name: string;

	@ApiProperty({
		description: "The description of the role",
		example: "Administrator"
	})
	description: string;
}
