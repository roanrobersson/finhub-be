import { Expose } from "class-transformer";

export class GetAllUsersResponseDto {
	@Expose()
	id: number;

	@Expose()
	name: string;

	@Expose()
	email: string;
}
