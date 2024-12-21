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

import { Public } from "./auth.guard";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
	@Inject(AuthService)
	private authService: AuthService;

	@Public()
	@HttpCode(HttpStatus.OK)
	@Post("login")
	@ApiOperation({ summary: "Sign in" })
	signIn(@Body() signInDto: Record<string, any>) {
		return this.authService.signIn(signInDto.username, signInDto.password);
	}

	@Public()
	@Post("refresh")
	@ApiOperation({ summary: "Refresh the access token" })
	refreshToken(@Body() body: { refresh_token: string }) {
		return this.authService.refreshAccessToken(body.refresh_token);
	}

	@Get("profile")
	@ApiOperation({ summary: "Get the user profile" })
	getProfile(@Request() req) {
		return req.user;
	}
}
