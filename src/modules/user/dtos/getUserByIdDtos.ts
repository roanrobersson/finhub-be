import { ApiProperty } from "@nestjs/swagger";
import { IsId } from "src/core/decorators/IsIdDecorator";

import {
	SimplifiedPermissionResponseDto,
	SimplifiedRoleResponseDto
} from "./commonDtos";

export class GetUserByIdParams {
	@IsId()
	@ApiProperty({
		description: "The id of the user",
		example: 1
	})
	userId: number;
}

export class GetUserByIdResponseDto {
	@ApiProperty({
		description: "The id of the user",
		example: "1"
	})
	id: number;

	@ApiProperty({
		description: "The name of the user",
		example: "Pedro"
	})
	name: string;

	@ApiProperty({
		description: "The email of the user",
		example: "pedro@gmail.com"
	})
	email: string;

	@ApiProperty({
		description: "The picture of the user",
		example: "ttps://i.pravatar.cc/150?img=2",
		nullable: true
	})
	picture: string | null;

	roles: SimplifiedRoleResponseDto[];

	permissions: SimplifiedPermissionResponseDto[];
}
