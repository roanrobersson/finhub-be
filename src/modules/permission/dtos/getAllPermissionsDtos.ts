import { ApiProperty } from "@nestjs/swagger";

export class GetAllPermissionResponseDto {
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

	@ApiProperty({
		description: "The description of the permission",
		example: "Allows to query users, roles and permissions"
	})
	description: string;
}
