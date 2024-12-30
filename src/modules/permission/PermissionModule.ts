import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PermissionController } from "src/modules/permission/PermissionController";
import { Permission } from "src/modules/permission/PermissionEntity";
import { PermissionService } from "src/modules/permission/PermissionService";

import { GetAllPermissionsMapper } from "./mappers/GetAllPermissionMapper";
import { GetPermissionByIdMapper } from "./mappers/GetPermissionByIdMapper";
import { PermissionRepository } from "./PermissionRepository";

@Module({
	imports: [TypeOrmModule.forFeature([Permission])],
	controllers: [PermissionController],
	providers: [
		PermissionService,
		PermissionRepository,
		GetAllPermissionsMapper,
		GetPermissionByIdMapper
	],
	exports: [PermissionService, PermissionRepository]
})
export class PermissionModule {}
