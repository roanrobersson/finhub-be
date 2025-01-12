import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SignInRequest {
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
