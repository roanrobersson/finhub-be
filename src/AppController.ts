import { Controller, Get } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";

import { Public } from "./modules/auth/AuthGuard";

@Controller()
export class AppController {
	@Public()
	@Get()
	@ApiOperation({ summary: "Hello world" })
	getHello(): string {
		return "Hello world!";
	}
}
