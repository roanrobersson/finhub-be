import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class SendEmailRequest {
	@IsNotEmpty()
	@IsEmail()
	@ApiProperty({
		description: "The email address of the recipient",
		example: "admin@gmail.com"
	})
	recipient: string;

	@IsNotEmpty()
	@ApiProperty({
		description: "The body of the email",
		example: "Hello, this is a test email."
	})
	body: string;
}
