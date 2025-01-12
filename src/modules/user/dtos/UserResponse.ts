import { ApiProperty } from "@nestjs/swagger";
import { PermissionSimplifiedResponse } from "src/modules/role/dtos/PermissionSimplifiedResponse";
import { RoleSimplifiedResponse } from "src/modules/role/dtos/RoleSimplifiedResponse";

export class UserResponse {
	@ApiProperty({
		description: "The id of the user",
		example: "1"
	})
	id: number;

	@ApiProperty({
		description: "The name of the user",
		example: "Pedro"
	})
	name: string;

	@ApiProperty({
		description: "The email of the user",
		example: "pedro@gmail.com"
	})
	email: string;

	@ApiProperty({
		description: "The picture of the user",
		example: "ttps://i.pravatar.cc/150?img=2",
		nullable: true
	})
	picture: string | null;

	roles: RoleSimplifiedResponse[];

	permissions: PermissionSimplifiedResponse[];
}
