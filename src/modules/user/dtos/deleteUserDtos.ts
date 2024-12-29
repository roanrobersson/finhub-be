import { ApiProperty } from "@nestjs/swagger";
import { IsId } from "src/core/decorators/IsIdDecorator";

export class DeleteUserParams {
	@IsId()
	@ApiProperty({
		description: "The id of the user",
		example: 1
	})
	userId: number;
}
