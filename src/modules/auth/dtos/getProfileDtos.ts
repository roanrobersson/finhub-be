import { Expose } from "class-transformer";

export class GetProfileResponseDto {
	@Expose()
	sub: number;

	@Expose()
	username: string;

	@Expose()
	iat: number;

	@Expose()
	exp: number;
}
