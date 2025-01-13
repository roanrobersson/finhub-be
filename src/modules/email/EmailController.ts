import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Inject,
	Post
} from "@nestjs/common";
import { ApiDefaultActionResponse } from "src/core/decorators/ApiDefaultResponseDecorator";
import { RoleEnum } from "src/core/enums/RoleEnum";

import { Roles } from "../auth/RolesDecorator";
import { SendEmailRequest } from "./dtos/SendEmailRequest";
import { SendEmailResponse } from "./dtos/SendEmailResponse";
import { EmailService } from "./EmailService";

@Controller("emails")
export class EmailController {
	@Inject()
	private emailService: EmailService;

	@Post("send")
	@Roles(RoleEnum.ADMIN)
	@HttpCode(HttpStatus.OK)
	@ApiDefaultActionResponse({
		description: "The email has been successfully sent.",
		type: SendEmailResponse
	})
	async sendEmail(
		@Body() sendEmailRequest: SendEmailRequest
	): Promise<SendEmailResponse> {
		await this.emailService.sendEmail(
			sendEmailRequest.recipient,
			sendEmailRequest.body
		);

		return { message: "The email has been successfully sent." };
	}
}
