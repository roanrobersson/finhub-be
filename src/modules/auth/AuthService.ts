import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { RoleEnum } from "src/core/enums/RoleEnum";
import { isPasswordValid } from "src/core/utils/passwordUtils";

import { RoleService } from "../role/RoleService";
import { User } from "../user/UserEntity";
import { UserService } from "../user/UserService";
import { AuthUser } from "./dtos/AuthUser";

@Injectable()
export class AuthService {
	@Inject()
	private jwtService: JwtService;

	@Inject()
	private userService: UserService;

	@Inject()
	private roleService: RoleService;

	async validateUserByEmailAndPassword(
		email: string,
		password: string
	): Promise<User | null> {
		try {
			const user = await this.userService.getByEmail(email);
			const isValidPassword = await isPasswordValid(password, user.password);
			if (!isValidPassword) {
				return null;
			}
			return user;
		} catch (error) {
			return null;
		}
	}

	async validateUserByEmail(email: string): Promise<User | null> {
		try {
			return await this.userService.getByEmail(email);
		} catch (error) {
			return null;
		}
	}

	async signUp(user: User): Promise<User> {
		const userRole = await this.roleService.getByName(RoleEnum.USER);
		user.addRole(userRole);
		user = await this.userService.save(user);
		return user;
	}

	generateJwtToken(user: AuthUser): string {
		const payload = {
			sub: user.id,
			name: user.name,
			username: user.email,
			picture: user.picture,
			roles: user.roles,
			permissions: user.permissions
		};
		return this.jwtService.sign(payload);
	}
}
