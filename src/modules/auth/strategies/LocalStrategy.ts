import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

import { AuthService } from "../AuthService";
import { AuthUser } from "../dtos/AuthUser";
import { UserMapper } from "../mappers/UserMapper";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, "local") {
	@Inject()
	private authService: AuthService;

	@Inject()
	private userMapper: UserMapper;

	async validate(username: string, password: string): Promise<AuthUser> {
		const user = await this.authService.validateUserByEmailAndPassword(
			username,
			password
		);
		if (!user) {
			throw new UnauthorizedException("Invalid credentials");
		}
		return this.userMapper.toAuthUser(user);
	}
}
