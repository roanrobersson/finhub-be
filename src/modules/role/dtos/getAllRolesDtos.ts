import { Expose } from "class-transformer";

export class GetAllRolesResponseDto {
	@Expose()
	id: number;

	@Expose()
	name: string;

	@Expose()
	description: string;
}
