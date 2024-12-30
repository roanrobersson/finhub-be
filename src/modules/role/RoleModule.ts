import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { PermissionModule } from "../permission/PermissionModule";
import { CreateRoleMapper } from "./mappers/CreateRoleMapper";
import { GetAllRolesMapper } from "./mappers/GetAllRolesMapper";
import { GetRoleByIdMapper } from "./mappers/GetRoleByIdMapper";
import { UpdateRoleMapper } from "./mappers/UpdateRoleMapper";
import { RoleController } from "./RoleController";
import { Role } from "./RoleEntity";
import { RolePermissionController } from "./RolePermissionController";
import { RoleRepository } from "./RoleRepository";
import { RoleService } from "./RoleService";

@Module({
	imports: [TypeOrmModule.forFeature([Role]), PermissionModule],
	controllers: [RoleController, RolePermissionController],
	providers: [
		RoleService,
		RoleRepository,
		GetAllRolesMapper,
		GetRoleByIdMapper,
		CreateRoleMapper,
		UpdateRoleMapper
	],
	exports: [RoleService, RoleRepository]
})
export class RoleModule {}
