import {
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Inject,
	Post,
	Request,
	UseGuards
} from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import {
	ApiDefaultActionResponse,
	ApiDefaultGetResponse
} from "src/core/decorators/ApiDefaultResponseDecorator";
import { Public } from "src/core/decorators/PublicDecorator";

import { User } from "../user/UserEntity";
import { AuthService } from "./AuthService";
import { GetProfileResponseDto } from "./dtos/getProfileDtos";
import { SignInResponseDto } from "./dtos/signInDtos";
import { AuthUserData } from "./JwtStrategy";
import { LocalAuthGuard } from "./LocalAuthGuard";

interface LocalAuthenticatedRequest extends Request {
	user: User;
}
interface JwtAuthenticatedRequest extends Request {
	user: AuthUserData;
}

@Controller("auth")
export class AuthController {
	@Inject(AuthService)
	private authService: AuthService;

	@Post("signin")
	@Public()
	@UseGuards(LocalAuthGuard)
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: "Sign in" })
	@ApiDefaultActionResponse({
		description: "The user has been successfully signed in.",
		type: SignInResponseDto
	})
	async signIn(
		@Request() req: LocalAuthenticatedRequest
	): Promise<SignInResponseDto> {
		return this.authService.signIn(req.user);
	}

	@Get("profile")
	@ApiOperation({ summary: "Get the user profile" })
	@ApiDefaultGetResponse({
		description: "The user profile has been successfully retrieved.",
		type: GetProfileResponseDto
	})
	async getProfile(
		@Request() req: JwtAuthenticatedRequest
	): Promise<GetProfileResponseDto> {
		return req.user;
	}
}
