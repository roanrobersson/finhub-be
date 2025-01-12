import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { IsPassword } from "src/core/decorators/IsPasswordValidDecorator";

export class ChangeUserPasswordRequest {
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
