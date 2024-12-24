import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
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
	@Expose()
	access_token: string;

	@Expose()
	refresh_token: string;
}
