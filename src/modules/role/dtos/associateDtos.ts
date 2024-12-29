import { ApiProperty } from "@nestjs/swagger";
import { IsId } from "src/core/decorators/IsIdDecorator";

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
