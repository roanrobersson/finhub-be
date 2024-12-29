import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
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
	@Expose()
	id: number;

	@Expose()
	name: string;

	@Expose()
	description: string;
}
