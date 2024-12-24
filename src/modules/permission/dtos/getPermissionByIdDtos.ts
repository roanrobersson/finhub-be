import { ApiProperty } from "@nestjs/swagger";
import { Id } from "src/core/decorators/IdDecorator";

export class GetPermissionByIdParams {
	@Id()
	@ApiProperty({
		description: "The id of the permission",
		example: 1
	})
	permissionId: number;
}

export class GetPermisssionByIdResponse {
	id: number;
	name: string;
	description: string;
}
