import { Inject, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import SendGrid, { MailDataRequired } from "@sendgrid/mail";
import { EnvVarEnum } from "src/core/enums/EnvVarEnum";

@Injectable()
export class SendGridClient {
	private logger: Logger;

	constructor(
		@Inject()
		protected configService: ConfigService
	) {
		const sendGridApiKey = configService.get<string>(
			EnvVarEnum.SENDGRID_API_KEY
		);
		if (!sendGridApiKey) {
			throw new Error("Sendgrid API key is missing");
		}
		this.logger = new Logger(SendGridClient.name);
		SendGrid.setApiKey(sendGridApiKey);
	}

	async send(mail: MailDataRequired): Promise<void> {
		try {
			await SendGrid.send(mail);
			this.logger.log(`Email successfully dispatched to ${mail.to as string}`);
		} catch (error) {
			this.logger.error("Error while sending email", error);
			throw error;
		}
	}
}
