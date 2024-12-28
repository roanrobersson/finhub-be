import { Expose } from "class-transformer";

export class GetAllPermissionResponseDto {
	@Expose()
	id: number;

	@Expose()
	name: string;

	@Expose()
	description: string;
}
