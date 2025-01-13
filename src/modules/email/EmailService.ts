// src/email/email.service.ts

import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MailDataRequired } from "@sendgrid/mail";
import { EnvVarEnum } from "src/core/enums/EnvVarEnum";

import { SendGridClient } from "./SendGridClient";

@Injectable()
export class EmailService {
	@Inject()
	private sendGridClient: SendGridClient;

	@Inject()
	private configService: ConfigService;

	async sendEmail(
		recipient: string,
		body = "This is a test mail"
	): Promise<void> {
		const senderId = this.configService.get<string>(
			EnvVarEnum.SENDGRID_SENDER_ID
		);
		if (!senderId) {
			throw new Error("Sender ID is missing");
		}
		const mail: MailDataRequired = {
			to: recipient,
			from: senderId,
			subject: "Test email",
			content: [{ type: "text/plain", value: body }]
		};
		await this.sendGridClient.send(mail);
	}
}
