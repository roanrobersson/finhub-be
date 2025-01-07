import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

import { User } from "../user/UserEntity";
import { AuthService } from "./AuthService";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	@Inject()
	private authService: AuthService;

	async validate(username: string, password: string): Promise<User | null> {
		const user = await this.authService.validateUser(username, password);

		if (!user) {
			throw new UnauthorizedException();
		}
		return user;
	}
}
