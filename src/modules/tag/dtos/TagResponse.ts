import { ApiProperty } from "@nestjs/swagger";

export class TagResponse {
	@ApiProperty({
		description: "The id of the tag",
		example: 1
	})
	id: number;

	@ApiProperty({
		description: "The name of the tag",
		example: "admin"
	})
	name: string;
}
