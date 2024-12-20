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

import { Public } from "./auth.guard";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
	@Inject(AuthService)
	private authService: AuthService;

	@Public()
	@HttpCode(HttpStatus.OK)
	@Post("login")
	signIn(@Body() signInDto: Record<string, any>) {
		return this.authService.signIn(signInDto.username, signInDto.password);
	}

	@Public()
	@Post("refresh")
	async refreshToken(@Body() body: { refresh_token: string }) {
		return this.authService.refreshAccessToken(body.refresh_token);
	}

	@Get("profile")
	getProfile(@Request() req) {
		return req.user;
	}
}
