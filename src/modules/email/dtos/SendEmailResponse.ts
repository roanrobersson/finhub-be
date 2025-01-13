import { ApiProperty } from "@nestjs/swagger";

export class SendEmailResponse {
	@ApiProperty({
		description: "The message of the response",
		example: "The email has been successfully sent."
	})
	message: string;
}
