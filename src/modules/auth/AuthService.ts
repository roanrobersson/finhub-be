import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { isPasswordValid } from "src/core/utils/passwordUtils";

import { User } from "../user/UserEntity";
import { UserService } from "../user/UserService";

@Injectable()
export class AuthService {
	@Inject()
	private jwtService: JwtService;

	@Inject()
	private userService: UserService;

	async validateUser(username: string, password: string): Promise<User | null> {
		try {
			const user = await this.userService.findOneByUsername(username);
			const isValidPassword = await isPasswordValid(password, user.password);
			if (!isValidPassword) {
				return null;
			}
			return user;
		} catch (error) {
			return null;
		}
	}

	async signIn(user: User): Promise<string> {
		const payload = await this.buildPayload(user);
		return this.jwtService.sign(payload);
	}

	private async buildPayload(user: User) {
		const roles = await user.getRoles();
		const permissions = await user.getPermissions();
		return {
			sub: user.id,
			name: user.name,
			username: user.email,
			roles: roles.map((role) => role.name),
			permissions: permissions.map((permission) => permission.name)
		};
	}
}
