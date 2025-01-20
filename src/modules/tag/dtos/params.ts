import { ApiProperty } from "@nestjs/swagger";
import { IsId } from "src/core/decorators/IsIdDecorator";

export class GetAllTagsParams {
	@IsId()
	@ApiProperty({
		description: "The id of the user",
		example: 1
	})
	userId: number;
}

export class CreateTagParams {
	@IsId()
	@ApiProperty({
		description: "The id of the user",
		example: 1
	})
	userId: number;
}

export class UpdateTagParams {
	@IsId()
	@ApiProperty({
		description: "The id of the tag",
		example: 1
	})
	tagId: number;

	@IsId()
	@ApiProperty({
		description: "The id of the user",
		example: 1
	})
	userId: number;
}

export class DeleteTagParams {
	@IsId()
	@ApiProperty({
		description: "The id of the tag",
		example: 1
	})
	tagId: number;

	@IsId()
	@ApiProperty({
		description: "The id of the user",
		example: 1
	})
	userId: number;
}
