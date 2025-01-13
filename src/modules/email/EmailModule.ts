import { Module } from "@nestjs/common";

import { EmailController } from "./EmailController";
import { EmailService } from "./EmailService";
import { SendGridClient } from "./SendGridClient";

@Module({
	controllers: [EmailController],
	providers: [EmailService, SendGridClient],
	exports: [EmailService]
})
export class EmailModule {}
