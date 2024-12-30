import { ApiProperty } from "@nestjs/swagger";

export class SimplifiedRoleResponseDto {
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
}

export class SimplifiedPermissionResponseDto {
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
