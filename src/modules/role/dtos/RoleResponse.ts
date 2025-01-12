import { ApiProperty } from "@nestjs/swagger";

import { PermissionSimplifiedResponse } from "./PermissionSimplifiedResponse";

export class RoleResponse {
	@ApiProperty({
		description: "The id of the role",
		example: 1
	})
	id: number;

	@ApiProperty({
		description: "The name of the role",
		example: "admin"
	})
	name: string;

	@ApiProperty({
		description: "The description of the role",
		example: "Administrator"
	})
	description: string;

	permissions: PermissionSimplifiedResponse[];
}
