import { ApiProperty } from "@nestjs/swagger";

export class GetProfileResponseDto {
	@ApiProperty({
		description: "The id of the user",
		example: "1"
	})
	sub: number;

	@ApiProperty({
		description: "The name of the user",
		example: "Admin"
	})
	name: string;

	@ApiProperty({
		description: "The username of the user",
		example: "admin"
	})
	username: string;

	@ApiProperty({
		description: "The time the token was issued",
		example: "1735586517"
	})
	iat: number;

	@ApiProperty({
		description: "The expiration time of the token",
		example: "1736882517"
	})
	exp: number;
}
