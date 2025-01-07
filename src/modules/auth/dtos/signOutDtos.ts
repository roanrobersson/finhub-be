import { ApiProperty } from "@nestjs/swagger";

export class SignOutResponseDto {
	@ApiProperty({
		description: "The message of the response",
		example: "The user has been successfully signed out."
	})
	message: string;
}
