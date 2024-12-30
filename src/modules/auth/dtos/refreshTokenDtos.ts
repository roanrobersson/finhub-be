import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class RefreshTokenBodyDto {
	@IsNotEmpty()
	@ApiProperty({
		description: "The refresh token",
		example:
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiYWRtaW5AZ21haWwuY29tIiwiaWF0IjoxNzM1MDQ2ODg3LCJleHAiOjE3Mzc2Mzg4ODd9.7YI9UQ6vLBYaQEVQLAX_HDp6j9Mo4_bvIpY_3DFSkbQ"
	})
	refresh_token: string;
}

export class RefreshTokenResponseDto {
	@ApiProperty({
		description: "The access token",
		example:
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiYWRtaW5AZ21haWwuY29tIiwiaWF0IjoxNzM1MDQ2ODg3LCJleHAiOjE3Mzc2Mzg4ODd9.7YI9UQ6vLBYaQEVQLAX_HDp6j9Mo4_bvIpY_3DFSkbQ"
	})
	access_token: string;
}
