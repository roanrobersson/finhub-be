import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SignInBodyDto {
	@IsNotEmpty()
	@ApiProperty()
	username: string;

	@IsNotEmpty()
	@ApiProperty()
	password: string;
}

export class SignInResponseDto {
	access_token: string;
	refresh_token: string;
}
