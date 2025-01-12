import { ApiProperty } from "@nestjs/swagger";

export class AuthResponse {
	@ApiProperty({
		description: "The message of the response",
		example: "The user has been successfully signed in."
	})
	message: string;
}
