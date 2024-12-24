import { ApiProperty } from "@nestjs/swagger";
import { Id } from "src/core/decorators/IdDecorator";

export class DeleteRoleParams {
	@Id()
	@ApiProperty({
		description: "The id of the role",
		example: 1
	})
	roleId: number;
}
