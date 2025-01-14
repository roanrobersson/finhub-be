import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import { IsPassword } from "src/core/decorators/IsPasswordValidDecorator";

export class SignUpRequest {
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
	@IsPassword()
	@ApiProperty({
		description: "The password of the user",
		example: "12345678"
	})
	password: string;

	@IsOptional()
	@ApiProperty({
		description: "The picture of the user",
		example: "https://i.pravatar.cc/150?img=2",
		nullable: true
	})
	picture: string | null;
}
