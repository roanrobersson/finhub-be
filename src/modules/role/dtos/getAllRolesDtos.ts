import { ApiProperty } from "@nestjs/swagger";

export class GetAllRolesResponseDto {
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
