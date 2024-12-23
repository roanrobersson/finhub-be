import { Module } from "@nestjs/common";

import { RoleController } from "./RoleController";

@Module({
	controllers: [RoleController]
})
export class RoleModule {}
