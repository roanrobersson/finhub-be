import { Controller, Get } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";

import { ApiDefaultGetResponse } from "./core/decorators/ApiDefaultResponseDecorator";
import { Public } from "./core/decorators/PublicDecorator";

@Controller()
export class AppController {
	@Public()
	@Get()
	@ApiOperation({ summary: "Hello world" })
	@ApiDefaultGetResponse({ public: true })
	getHello(): string {
		return "Hello world!";
	}
}
