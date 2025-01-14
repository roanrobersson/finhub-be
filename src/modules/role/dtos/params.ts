import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { IsId } from "src/core/decorators/IsIdDecorator";

export class GetRoleByIdParams {
	@IsId()
	@ApiProperty({
		description: "The id of the role",
		example: 1
	})
	roleId: number;
}

export class GetRoleByNameParams {
	@IsString()
	@ApiProperty({
		description: "The name of the role",
		example: "admin"
	})
	name: string;
}

export class UpdateRoleParams {
	@IsId()
	@ApiProperty({
		description: "The id of the role",
		example: 1
	})
	roleId: number;
}

export class DeleteRoleParams {
	@IsId()
	@ApiProperty({
		description: "The id of the role",
		example: 1
	})
	roleId: number;
}

export class AssociateRolePermissionParams {
	@IsId()
	@ApiProperty({
		description: "The id of the role",
		example: 1
	})
	roleId: number;

	@IsId()
	@ApiProperty({
		description: "The id of the permission",
		example: 1
	})
	permissionId: number;
}

export class DesassociateRolePermissionParams {
	@IsId()
	@ApiProperty({
		description: "The id of the role",
		example: 1
	})
	roleId: number;

	@IsId()
	@ApiProperty({
		description: "The id of the permission",
		example: 1
	})
	permissionId: number;
}
