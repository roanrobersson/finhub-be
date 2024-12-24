import { ApiProperty } from "@nestjs/swagger";
import { Id } from "src/core/decorators/IdDecorator";

export class DesassociateRolePermissionParams {
	@Id()
	@ApiProperty({
		description: "The id of the role",
		example: 1
	})
	roleId: number;

	@Id()
	@ApiProperty({
		description: "The id of the permission",
		example: 1
	})
	permissionId: number;
}
