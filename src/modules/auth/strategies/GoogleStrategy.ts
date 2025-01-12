import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { OAuth2Client } from "google-auth-library";
import { Strategy } from "passport-custom";
import { EnvVarEnum } from "src/core/enums/EnvVarEnum";

import { User } from "../../user/UserEntity";
import { UserService } from "../../user/UserService";
import { AuthService } from "../AuthService";
import { AuthUser } from "../dtos/AuthUser";
import { UserMapper } from "../mappers/UserMapper";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
	@Inject()
	private userService: UserService;

	@Inject()
	private authService: AuthService;

	@Inject()
	private configService: ConfigService;

	@Inject()
	private userMapper: UserMapper;

	private oauthClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

	async validate(req: Request): Promise<AuthUser> {
		const token = this.getRequestToken(req);
		const payload = await this.getTokenPayload(token);
		let user = await this.authService.validateUserByEmail(payload.email);
		const isNewUser = !user;
		if (!user) {
			user = new User();
			user.email = payload.email;
			user.name = payload.name;
			user.picture = payload.picture ?? null;
			user = await this.userService.save(user);
		}
		const authUser = await this.userMapper.toAuthUser(user);
		authUser.isNewUser = isNewUser;
		return authUser;
	}

	private getRequestToken(req: Request): string {
		const token =
			req.body && "token" in req.body && typeof req.body.token === "string"
				? req.body.token
				: null;
		if (!token) {
			throw new UnauthorizedException("Missing Google token");
		}
		return token;
	}

	private async getTokenPayload(
		token: string
	): Promise<{ email: string; name: string; picture: string | null }> {
		try {
			const googleClientId = this.configService.get<number>(
				EnvVarEnum.GOOGLE_CLIENT_ID
			);
			const ticket = await this.oauthClient.verifyIdToken({
				idToken: token,
				audience: String(googleClientId)
			});
			const payload = ticket.getPayload();
			if (!payload || !payload.email || !payload.name) {
				throw new UnauthorizedException("Invalid Google token");
			}
			return {
				email: payload.email,
				name: payload.name,
				picture: payload.picture ?? null
			};
		} catch (error) {
			throw new UnauthorizedException("Invalid Google token");
		}
	}
}
