import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserBodyDto {
	@IsNotEmpty()
	@ApiProperty({ description: "The name of the user", example: "Pedro" })
	name: string;

	@IsEmail()
	@ApiProperty({
		description: "The email of the user",
		example: "pedro@gmail.com"
	})
	email: string;

	@IsNotEmpty()
	@ApiProperty({
		description: "The password of the user",
		example: "12345678"
	})
	password: string;
}

export class CreateUserResponseDto {
	id: number;
	name: string;
	email: string;
}
