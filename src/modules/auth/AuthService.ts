import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { EntityNotFoundException } from "src/core/exceptions/EntityNotFoundException";
import { isPasswordValid } from "src/core/utils/passwordUtils";

import { User } from "../user/UserEntity";
import { UserService } from "../user/UserService";
import { RefreshTokenResponseDto } from "./dtos/refreshTokenDtos";
import { SignInResponseDto } from "./dtos/signInDtos";

@Injectable()
export class AuthService {
	@Inject(UserService)
	private userService: UserService;

	@Inject(JwtService)
	private jwtService: JwtService;

	private readonly jwtExpirationTime = process.env.JWT_EXPIRATION_TIME || "15m";
	private readonly jwtRefreshTokenExpirationTime =
		process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME || "7d";

	async signIn(username: string, password: string): Promise<SignInResponseDto> {
		try {
			const user = await this.userService.findOneByUsername(username);
			const isValidPassword = await isPasswordValid(password, user.password);

			if (!isValidPassword) {
				throw new UnauthorizedException();
			}

			const payload = await this.buildPayload(user);

			const access_token = await this.jwtService.signAsync(payload, {
				expiresIn: this.jwtExpirationTime
			});

			const refresh_token = await this.jwtService.signAsync(payload, {
				expiresIn: this.jwtRefreshTokenExpirationTime
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
	): Promise<RefreshTokenResponseDto> {
		try {
			const payload = await this.jwtService.verifyAsync(refreshToken);

			const user = await this.userService.findOneByUsername(payload.username);
			if (!user) {
				throw new UnauthorizedException("Invalid user.");
			}

			const newPayload = await this.buildPayload(user);

			const newAccessToken = await this.jwtService.signAsync(newPayload, {
				expiresIn: this.jwtExpirationTime
			});

			return { access_token: newAccessToken };
		} catch (err) {
			throw new UnauthorizedException("Invalid or expired refresh token.");
		}
	}

	private async buildPayload(user: User) {
		const roles = await user.getRoles();
		const permissions = await user.getPermissions();
		return {
			sub: user.id,
			username: user.email,
			roles: roles.map((role) => role.name),
			permissions: permissions.map((permission) => permission.name)
		};
	}
}
