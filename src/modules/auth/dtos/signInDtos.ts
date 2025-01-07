import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SignInBodyDto {
	@IsNotEmpty()
	@ApiProperty({
		description: "The username of the user",
		example: "admin@gmail.com"
	})
	username: string;

	@IsNotEmpty()
	@ApiProperty({
		description: "The password of the user",
		example: "12345678"
	})
	password: string;
}

export class SignInResponseDto {
	@ApiProperty({
		description: "The message of the response",
		example: "The user has been successfully signed in."
	})
	message: string;
}
