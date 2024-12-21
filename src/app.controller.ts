import { Controller, Get } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";

import { AppService } from "./app.service";
import { Public } from "./auth/auth.guard";

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Public()
	@Get()
	@ApiOperation({ summary: "Hello world" })
	getHello(): string {
		return this.appService.getHello();
	}
}
