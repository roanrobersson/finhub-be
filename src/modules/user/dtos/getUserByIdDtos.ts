import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { Id } from "src/core/decorators/IdDecorator";

export class GetUserByIdParams {
	@Id()
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
