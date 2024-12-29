import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { IsId } from "src/core/decorators/IsIdDecorator";
import { IsPassword } from "src/core/decorators/IsPasswordValidDecorator";

export class ChangeUserPasswordParamsDto {
	@IsId()
	@ApiProperty({
		description: "The id of the user",
		example: 1
	})
	userId: number;
}

export class ChangeUserPasswordBodyDto {
	@IsNotEmpty()
	@ApiProperty({
		description: "The current password",
		example: "12345678"
	})
	currentPassword: string;

	@IsNotEmpty()
	@IsPassword()
	@ApiProperty({
		description: "The new password",
		example: "87654321"
	})
	newPassword: string;
}
