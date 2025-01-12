import {
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Inject,
	Post,
	Req,
	Res,
	UseGuards
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ApiCreatedResponse, ApiOperation } from "@nestjs/swagger";
import { Response } from "express";
import { StringValue } from "ms";
import {
	ApiDefaultActionResponse,
	ApiDefaultGetResponse
} from "src/core/decorators/ApiDefaultResponseDecorator";
import { Public } from "src/core/decorators/PublicDecorator";
import { EnvEnum } from "src/core/enums/EnvEnum";
import { EnvVarEnum } from "src/core/enums/EnvVarEnum";
import { timespanToMilliseconds } from "src/core/utils/dateTimeUtils";

import { AuthService } from "./AuthService";
import { JWT_COOKIE_NAME } from "./constants";
import { AuthRequest } from "./dtos/AuthRequest";
import { AuthResponse } from "./dtos/AuthResponse";
import { AuthUser } from "./dtos/AuthUser";
import { ProfileResponse } from "./dtos/ProfileResponse";
import { GoogleOauthGuard } from "./guards/GoogleOauthGuard";
import { LocalAuthGuard } from "./guards/LocalAuthGuard";

@Controller("auth")
export class AuthController {
	@Inject()
	private configService: ConfigService;

	@Inject()
	private authService: AuthService;

	@Post("signin")
	@Public()
	@UseGuards(LocalAuthGuard)
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: "Sign in" })
	@ApiDefaultActionResponse({
		description: "The user has been successfully signed in.",
		type: AuthResponse,
		public: true
	})
	async signIn(
		@Req() req: AuthRequest,
		@Res({ passthrough: true }) res: Response
	): Promise<AuthResponse> {
		await this.setAuthCookie(res, req.user);
		return { message: "The user has been successfully signed in." };
	}

	@Post("google")
	@Public()
	@UseGuards(GoogleOauthGuard)
	@ApiOperation({ summary: "Sign in with Google" })
	@ApiDefaultActionResponse({
		description: "The user has been successfully signed in.",
		type: AuthResponse,
		public: true
	})
	@ApiCreatedResponse({
		description:
			"The user has been successfully signed in and a new account has been created."
	})
	async signInWithGoogle(
		@Req() req: AuthRequest,
		@Res({ passthrough: true }) res: Response
	): Promise<AuthResponse> {
		const user = req.user;
		await this.setAuthCookie(res, user);
		if (user.isNewUser) {
			res.status(HttpStatus.CREATED);
			return {
				message:
					"The user has been successfully signed in and a new account has been created."
			};
		}
		res.status(HttpStatus.OK);
		return { message: "The user has been successfully signed in." };
	}

	@Post("signout")
	@Public()
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: "Sign in" })
	@ApiDefaultActionResponse({
		description: "The user has been successfully signed out.",
		type: AuthResponse,
		public: true
	})
	logout(@Res({ passthrough: true }) res: Response) {
		res.clearCookie(JWT_COOKIE_NAME);
		return { message: "The user has been successfully signed out." };
	}

	@Get("profile")
	@ApiOperation({ summary: "Get the user profile" })
	@ApiDefaultGetResponse({
		description: "The user profile has been successfully retrieved.",
		type: ProfileResponse,
		noRoleGuard: true
	})
	async getProfile(@Req() req: AuthRequest): Promise<ProfileResponse> {
		return req.user;
	}

	private async setAuthCookie(res: Response, user: AuthUser) {
		const jwtToken = await this.authService.generateJwtToken(user);
		const isProductionEnv =
			this.configService.get<EnvEnum>(EnvVarEnum.NODE_ENV) ===
			EnvEnum.PRODUCTION;
		const cookieExpirationTime = this.configService.get<number>(
			EnvVarEnum.COOKIE_EXPIRATION_TIME
		);
		res.cookie(JWT_COOKIE_NAME, jwtToken, {
			httpOnly: true,
			secure: isProductionEnv,
			sameSite: "strict",
			maxAge: timespanToMilliseconds(
				cookieExpirationTime as unknown as StringValue
			)
		});
	}
}
