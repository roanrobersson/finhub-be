import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

import "dotenv/config";

import { ExtractJwt, Strategy } from "passport-jwt";

const JWT_SECRET = process.env.JWT_SECRET;

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
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: JWT_SECRET
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
