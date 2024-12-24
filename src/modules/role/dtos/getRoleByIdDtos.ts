import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { Id } from "src/core/decorators/IdDecorator";

export class GetRoleByIdParamsDto {
	@Id()
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
