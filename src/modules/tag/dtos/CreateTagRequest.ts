import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateTagRequest {
	@IsNotEmpty()
	@ApiProperty({
		description: "The name of the tag",
		example: "admin"
	})
	name: string;
}
