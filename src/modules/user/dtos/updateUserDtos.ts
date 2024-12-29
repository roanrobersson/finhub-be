import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { IsId } from "src/core/decorators/IsIdDecorator";

export class UpdateUserParamsDto {
	@IsId()
	@ApiProperty({
		description: "The id of the user",
		example: 1
	})
	userId: number;
}

export class UpdateUserBodyDto {
	@IsNotEmpty()
	@ApiProperty({
		description: "The name of the user",
		example: "admin"
	})
	name: string;
}

export class UpdateUserResponseDto {
	@Expose()
	id: number;

	@Expose()
	name: string;

	@Expose()
	email: string;

	@Expose()
	isActive: boolean;
}
