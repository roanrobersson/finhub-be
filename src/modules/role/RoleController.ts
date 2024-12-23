import { Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";

@Controller("roles")
export class RoleController {
	@Get()
	@ApiOperation({ summary: "List all roles" })
	findAll() {
		return "This action returns all roles";
	}

	@Get(":id")
	@ApiOperation({ summary: "Find a role by id" })
	findOne() {
		return "This action returns a role";
	}

	@Post()
	@ApiOperation({ summary: "Create a new role" })
	create() {
		return "This action creates a new role";
	}

	@Put(":id")
	@ApiOperation({ summary: "Update a role by id" })
	update() {
		return "This action updates a role";
	}

	@Delete(":id")
	@ApiOperation({ summary: "Remove a role by id" })
	remove() {
		return "This action removes a role";
	}
}
