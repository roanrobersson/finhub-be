import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { PermissionModule } from "../permission/PermissionModule";
import { RoleController } from "./RoleController";
import { Role } from "./RoleEntity";
import { RolePermissionController } from "./RolePermissionController";
import { RoleRepository } from "./RoleRepository";
import { RoleService } from "./RoleService";

@Module({
	imports: [TypeOrmModule.forFeature([Role]), PermissionModule],
	controllers: [RoleController, RolePermissionController],
	providers: [RoleService, RoleRepository],
	exports: [RoleService, RoleRepository]
})
export class RoleModule {}
