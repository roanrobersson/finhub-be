import { ApiProperty } from "@nestjs/swagger";

export class RoleSimplifiedResponse {
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
