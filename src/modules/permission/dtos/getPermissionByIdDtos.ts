import { ApiProperty } from "@nestjs/swagger";
import { IsId } from "src/core/decorators/IsIdDecorator";

export class GetPermissionByIdParams {
	@IsId()
	@ApiProperty({
		description: "The id of the permission",
		example: 1
	})
	permissionId: number;
}

export class GetPermisssionByIdResponse {
	@ApiProperty({
		description: "The id of the permission",
		example: 1
	})
	id: number;

	@ApiProperty({
		description: "The name of the permission",
		example: "QUERY_USERS_ROLES_PERMISSIONS"
	})
	name: string;
}
