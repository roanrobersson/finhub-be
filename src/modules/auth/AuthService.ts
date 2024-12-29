import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { EntityNotFoundException } from "src/core/exceptions/EntityNotFoundException";
import { isPasswordValid } from "src/core/utils/passwordUtils";

import { UserService } from "../user/UserService";

@Injectable()
export class AuthService {
	@Inject(UserService)
	private userService: UserService;

	@Inject(JwtService)
	private jwtService: JwtService;

	async signIn(
		username: string,
		password: string
	): Promise<{ access_token: string; refresh_token: string }> {
		try {
			const user = await this.userService.findOneByUsername(username);
			const isValidPassword = await isPasswordValid(password, user.password);

			if (!isValidPassword) {
				throw new UnauthorizedException();
			}

			const payload = { sub: user.id, username: user.email };
			const access_token = await this.jwtService.signAsync(payload, {
				expiresIn: process.env.JWT_EXPIRATION_TIME || "15m"
			});

			const refresh_token = await this.jwtService.signAsync(payload, {
				expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME || "7d"
			});

			return {
				access_token,
				refresh_token
			};
		} catch (error) {
			if (error instanceof EntityNotFoundException) {
				throw new UnauthorizedException();
			}
			throw error;
		}
	}

	async refreshAccessToken(
		refreshToken: string
	): Promise<{ access_token: string }> {
		try {
			const payload = await this.jwtService.verifyAsync(refreshToken);

			const user = await this.userService.findOneByUsername(payload.username);
			if (!user) {
				throw new UnauthorizedException("Invalid user.");
			}

			const newAccessToken = await this.jwtService.signAsync(
				{ sub: user.id, username: user.email },
				{ expiresIn: process.env.JWT_EXPIRATION_TIME || "15m" }
			);

			return { access_token: newAccessToken };
		} catch (err) {
			throw new UnauthorizedException("Invalid or expired refresh token.");
		}
	}
}
