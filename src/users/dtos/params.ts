import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export class FindOneParams {
	@ApiProperty({
		description: "The id of the user",
		example: 1
	})
	@IsNumberString()
	id: number;
}
