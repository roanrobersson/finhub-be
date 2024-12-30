import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateRoleBodyDto {
	@IsNotEmpty()
	@ApiProperty({
		description: "The name of the role",
		example: "admin"
	})
	name: string;

	@IsNotEmpty()
	@ApiProperty({
		description: "The description of the role",
		example: "Administrator"
	})
	description: string;
}

export class CreateRoleResponseDto {
	@ApiProperty({
		description: "The name of the role",
		example: "admin"
	})
	name: string;

	@ApiProperty({
		description: "The description of the role",
		example: "Administrator"
	})
	description: string;
}
