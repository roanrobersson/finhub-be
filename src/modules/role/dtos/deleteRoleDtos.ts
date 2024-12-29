import { ApiProperty } from "@nestjs/swagger";
import { IsId } from "src/core/decorators/IsIdDecorator";

export class DeleteRoleParams {
	@IsId()
	@ApiProperty({
		description: "The id of the role",
		example: 1
	})
	roleId: number;
}
