import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Inject,
	Post,
	Request
} from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import {
	ApiDefaultActionResponse,
	ApiDefaultGetResponse
} from "src/core/decorators/ApiDefaultResponseDecorator";

import { Public } from "./AuthGuard";
import { AuthService } from "./AuthService";
import { GetProfileResponseDto } from "./dtos/getProfileDtos";
import {
	RefreshTokenBodyDto,
	RefreshTokenResponseDto
} from "./dtos/refreshTokenDtos";
import { SignInBodyDto, SignInResponseDto } from "./dtos/signInDtos";

@Controller("auth")
export class AuthController {
	@Inject(AuthService)
	private authService: AuthService;

	@Public()
	@Post("signin")
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: "Sign in" })
	@ApiDefaultActionResponse({
		description: "The user has been successfully signed in.",
		type: SignInResponseDto
	})
	async signIn(@Body() signInDto: SignInBodyDto): Promise<SignInResponseDto> {
		const response = await this.authService.signIn(
			signInDto.username,
			signInDto.password
		);
		// return plainToInstance(SignInResponseDto, response, {
		// 	excludeExtraneousValues: true
		// });
		return response;
	}

	@Public()
	@Post("refresh")
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: "Refresh the access token" })
	@ApiDefaultActionResponse({
		description: "The access token has been successfully refreshed.",
		type: RefreshTokenResponseDto,
		public: true
	})
	async refreshToken(
		@Body() body: RefreshTokenBodyDto
	): Promise<RefreshTokenResponseDto> {
		const response = this.authService.refreshAccessToken(body.refresh_token);
		// return plainToInstance(RefreshTokenResponseDto, response, {
		// 	excludeExtraneousValues: true
		// });
		return response;
	}

	@Get("profile")
	@ApiOperation({ summary: "Get the user profile" })
	@ApiDefaultGetResponse({
		description: "The user profile has been successfully retrieved.",
		type: GetProfileResponseDto
	})
	async getProfile(@Request() req): Promise<GetProfileResponseDto> {
		// return plainToInstance(GetProfileResponseDto, req.user, {
		// 	excludeExtraneousValues: true
		// });
		return req.user;
	}
}
