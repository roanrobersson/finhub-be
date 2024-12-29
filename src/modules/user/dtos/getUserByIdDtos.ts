import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsId } from "src/core/decorators/IsIdDecorator";

export class GetUserByIdParams {
	@IsId()
	@ApiProperty({
		description: "The id of the user",
		example: 1
	})
	userId: number;
}

export class GetUserByIdResponseDto {
	@Expose()
	id: number;

	@Expose()
	name: string;

	@Expose()
	email: string;
}
