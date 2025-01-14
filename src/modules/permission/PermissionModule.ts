import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PermissionController } from "src/modules/permission/PermissionController";
import { Permission } from "src/modules/permission/PermissionEntity";
import { PermissionService } from "src/modules/permission/PermissionService";

import { PermissionResponseMapper } from "./mappers/PermissionResponseMapper";
import { PermissionRepository } from "./PermissionRepository";

@Module({
	imports: [TypeOrmModule.forFeature([Permission])],
	controllers: [PermissionController],
	providers: [
		PermissionService,

		PermissionRepository,

		PermissionResponseMapper
	],
	exports: [PermissionService, PermissionResponseMapper]
})
export class PermissionModule {}
