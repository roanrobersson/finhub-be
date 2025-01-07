import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { EnvVarEnum } from "src/core/enums/EnvVarEnum";

import { JWT_COOKIE_NAME } from "./constants";

export type JwtData = {
	sub: number;
	name: string;
	username: string;
	roles: string[];
	permissions: string[];
	iat: number;
	exp: number;
};

export type AuthUserData = {
	id: number;
	name: string;
	email: string;
	roles: string[];
	permissions: string[];
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		@Inject()
		protected configService: ConfigService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(req: Request) => {
					return req.cookies?.[JWT_COOKIE_NAME];
				}
			]),
			ignoreExpiration: false,
			secretOrKey: configService.get<string>(EnvVarEnum.JWT_SECRET)
		});
	}

	async validate(payload: JwtData): Promise<AuthUserData> {
		return {
			id: payload.sub,
			name: payload.name,
			email: payload.username,
			roles: payload.roles,
			permissions: payload.permissions
		};
	}
}
