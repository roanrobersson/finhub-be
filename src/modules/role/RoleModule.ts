import { Module } from "@nestjs/common";
import { DrizzleModule } from "database/DrizzleModule";
import { PermissionService } from "src/modules/permission/PermissionService";

import { PermissionRepository } from "../permission/PermissionRepository";
import { RoleController } from "./RoleController";
import { RolePermissionController } from "./RolePermissionController";
import { RoleRepository } from "./RoleRepository";
import { RoleService } from "./RoleService";

@Module({
	imports: [DrizzleModule],
	controllers: [RoleController, RolePermissionController],
	providers: [
		PermissionService,
		PermissionRepository,
		RoleService,
		RoleRepository
	],
	exports: [PermissionService]
})
export class RoleModule {}
