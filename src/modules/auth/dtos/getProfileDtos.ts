import { ApiProperty } from "@nestjs/swagger";

export class GetProfileResponseDto {
	@ApiProperty({
		description: "The id of the user",
		example: "1"
	})
	id: number;

	@ApiProperty({
		description: "The name of the user",
		example: "Admin"
	})
	name: string;

	@ApiProperty({
		description: "The email of the user",
		example: "admin"
	})
	email: string;

	@ApiProperty({
		description: "The roles of the user",
		example: ["admin"]
	})
	roles: string[];

	@ApiProperty({
		description: "The permissions of the user",
		example: ["QUERY_USERS_ROLES_PERMISSIONS", "EDIT_USERS_ROLES_PERMISSIONS"]
	})
	permissions: string[];
}
