import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
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
	@Expose()
	id: number;

	@Expose()
	name: string;

	@Expose()
	description: string;
}
