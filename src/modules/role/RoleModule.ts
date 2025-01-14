import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { PermissionModule } from "../permission/PermissionModule";
import { CreateRoleMapper } from "./mappers/CreateRoleMapper";
import { RoleResponseMapper } from "./mappers/RoleResponseMapper";
import { RoleSimplifiedResponseMapper } from "./mappers/RoleSimplifiedResponseMapper";
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

		CreateRoleMapper,
		UpdateRoleMapper,
		RoleResponseMapper,
		RoleSimplifiedResponseMapper
	],
	exports: [
		RoleService,

		CreateRoleMapper,
		UpdateRoleMapper,
		RoleResponseMapper,
		RoleSimplifiedResponseMapper
	]
})
export class RoleModule {}
