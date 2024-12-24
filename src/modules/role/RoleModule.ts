import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PermissionController } from "src/modules/permission/PermissionController";
import { Permission } from "src/modules/permission/PermissionEntity";
import { PermissionService } from "src/modules/permission/PermissionService";

import { RoleController } from "./RoleController";
import { Role } from "./RoleEntity";
import { RolePermissionController } from "./RolePermissionController";
import { RoleService } from "./RoleService";

@Module({
	imports: [TypeOrmModule.forFeature([Permission, Role])],
	controllers: [PermissionController, RoleController, RolePermissionController],
	providers: [PermissionService, RoleService],
	exports: [PermissionService, RoleService]
})
export class RoleModule {}
