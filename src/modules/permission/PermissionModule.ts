import { Module } from "@nestjs/common";
import { DrizzleModule } from "database/DrizzleModule";
import { PermissionController } from "src/modules/permission/PermissionController";
import { PermissionService } from "src/modules/permission/PermissionService";

import { PermissionRepository } from "./PermissionRepository";

@Module({
	imports: [DrizzleModule],
	controllers: [PermissionController],
	providers: [PermissionService, PermissionRepository],
	exports: [PermissionService]
})
export class PermissionModule {}
