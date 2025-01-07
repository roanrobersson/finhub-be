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
import { ApiOperation } from "@nestjs/swagger";
import { Request, Response } from "express";
import { StringValue } from "ms";
import {
	ApiDefaultActionResponse,
	ApiDefaultGetResponse
} from "src/core/decorators/ApiDefaultResponseDecorator";
import { Public } from "src/core/decorators/PublicDecorator";
import { EnvEnum } from "src/core/enums/EnvEnum";
import { EnvVarEnum } from "src/core/enums/EnvVarEnum";
import { timespanToMilliseconds } from "src/core/utils/dateTimeUtils";

import { User } from "../user/UserEntity";
import { AuthService } from "./AuthService";
import { JWT_COOKIE_NAME } from "./constants";
import { GetProfileResponseDto } from "./dtos/getProfileDtos";
import { SignInResponseDto } from "./dtos/signInDtos";
import { SignOutResponseDto } from "./dtos/signOutDtos";
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
	@Inject()
	private configService: ConfigService;

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
		@Req() req: LocalAuthenticatedRequest,
		@Res({ passthrough: true }) res: Response
	): Promise<any> {
		const jwtToken = await this.authService.signIn(req.user);
		res.cookie(JWT_COOKIE_NAME, jwtToken, {
			httpOnly: true,
			secure:
				this.configService.get<EnvEnum>(EnvVarEnum.NODE_ENV) ===
				EnvEnum.PRODUCTION,
			sameSite: "strict",
			maxAge: timespanToMilliseconds(
				this.configService.get<number>(
					EnvVarEnum.COOKIE_EXPIRATION_TIME
				) as unknown as StringValue
			)
		});
		return { message: "The user has been successfully signed in." };
	}

	@Post("signout")
	@Public()
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: "Sign in" })
	@ApiDefaultActionResponse({
		description: "The user has been successfully signed out.",
		type: SignOutResponseDto
	})
	logout(@Res({ passthrough: true }) res: Response) {
		res.clearCookie(JWT_COOKIE_NAME);
		return { message: "The user has been successfully signed out." };
	}

	@Get("profile")
	@ApiOperation({ summary: "Get the user profile" })
	@ApiDefaultGetResponse({
		description: "The user profile has been successfully retrieved.",
		type: GetProfileResponseDto
	})
	async getProfile(
		@Req() req: JwtAuthenticatedRequest
	): Promise<GetProfileResponseDto> {
		return req.user;
	}
}
