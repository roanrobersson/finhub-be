import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { IsPassword } from "src/core/decorators/IsPasswordValidDecorator";

import {
	SimplifiedPermissionResponseDto,
	SimplifiedRoleResponseDto
} from "./commonDtos";

export class CreateUserBodyDto {
	@IsNotEmpty()
	@ApiProperty({ description: "The name of the user", example: "Pedro" })
	name: string;

	@IsEmail()
	@ApiProperty({
		description: "The email of the user",
		example: "pedro@gmail.com"
	})
	email: string;

	@IsNotEmpty()
	@IsPassword()
	@ApiProperty({
		description: "The password of the user",
		example: "12345678"
	})
	password: string;

	@ApiProperty({
		description: "The picture of the user",
		example: "ttps://i.pravatar.cc/150?img=2",
		nullable: true
	})
	picture: string | null;
}

export class CreateUserResponseDto {
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
