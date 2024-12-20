import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
	@Inject(UsersService)
	private usersService: UsersService;

	@Inject(JwtService)
	private jwtService: JwtService;

	async signIn(
		username: string,
		pass: string
	): Promise<{ access_token: string; refresh_token: string }> {
		const user = await this.usersService.findOne(username);
		if (user?.password !== pass) {
			throw new UnauthorizedException();
		}

		const payload = { sub: user.userId, username: user.username };
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
	}

	async refreshAccessToken(
		refreshToken: string
	): Promise<{ access_token: string }> {
		try {
			const payload = await this.jwtService.verifyAsync(refreshToken);

			const user = await this.usersService.findOne(payload.username);
			if (!user) {
				throw new UnauthorizedException("Usuário inválido.");
			}

			const newAccessToken = await this.jwtService.signAsync(
				{ sub: user.userId, username: user.username },
				{ expiresIn: process.env.JWT_EXPIRATION_TIME || "15m" }
			);

			return { access_token: newAccessToken };
		} catch (err) {
			throw new UnauthorizedException("Invalid or expired refresh token.");
		}
	}
}
