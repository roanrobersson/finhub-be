import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateUserRequest {
	@IsNotEmpty()
	@ApiProperty({
		description: "The name of the user",
		example: "admin"
	})
	name: string;

	@IsOptional()
	@ApiProperty({
		description: "The picture of the user",
		example: "ttps://i.pravatar.cc/150?img=2",
		nullable: true
	})
	picture: string | null;
}
