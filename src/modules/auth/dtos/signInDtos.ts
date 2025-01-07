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
		description: "The access token",
		example:
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiYWRtaW5AZ21haWwuY29tIiwiaWF0IjoxNzM1MDQ2ODg3LCJleHAiOjE3Mzc2Mzg4ODd9.7YI9UQ6vLBYaQEVQLAX_HDp6j9Mo4_bvIpY_3DFSkbQ"
	})
	access_token: string;
}
