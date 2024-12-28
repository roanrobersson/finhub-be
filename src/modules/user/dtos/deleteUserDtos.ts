import { ApiProperty } from "@nestjs/swagger";
import { Id } from "src/core/decorators/IdDecorator";

export class DeleteUserParams {
	@Id()
	@ApiProperty({
		description: "The id of the user",
		example: 1
	})
	userId: number;
}
