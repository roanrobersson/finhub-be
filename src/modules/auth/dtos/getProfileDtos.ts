import { ApiProperty } from "@nestjs/swagger";

export class GetProfileResponseDto {
	sub: number;

	@ApiProperty({
		description: "The username of the user",
		example: "admin"
	})
	username: string;

	iat: number;

	exp: number;
}
