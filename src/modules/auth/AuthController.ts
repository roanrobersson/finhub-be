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
	async signIn(@Body() signInDto: SignInBodyDto): Promise<SignInResponseDto> {
		return this.authService.signIn(signInDto.username, signInDto.password);
	}

	@Public()
	@Post("refresh")
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: "Refresh the access token" })
	async refreshToken(
		@Body() body: RefreshTokenBodyDto
	): Promise<RefreshTokenResponseDto> {
		return this.authService.refreshAccessToken(body.refresh_token);
	}

	@Get("profile")
	@ApiOperation({ summary: "Get the user profile" })
	async getProfile(@Request() req): Promise<GetProfileResponseDto> {
		return req.user;
	}
}
