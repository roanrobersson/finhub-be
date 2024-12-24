import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
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
	@Expose()
	id: number;

	@Expose()
	name: string;

	@Expose()
	description: string;
}
