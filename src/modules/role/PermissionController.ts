import { Controller, Get } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";

@Controller("permissions")
export class PermissionController {
	@Get()
	@ApiOperation({ summary: "List all permissions" })
	findAll() {
		return "This action returns all permissions";
	}

	@Get(":id")
	@ApiOperation({ summary: "Find a permission by id" })
	findOne() {
		return "This action returns a permission";
	}
}
