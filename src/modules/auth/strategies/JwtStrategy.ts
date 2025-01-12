import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { EnvVarEnum } from "src/core/enums/EnvVarEnum";

import { JWT_COOKIE_NAME } from "../constants";
import { AuthUser } from "../dtos/AuthUser";
import { JwtPaylod } from "../dtos/JwtPaylod";
import { JwtPayloadMapper } from "../mappers/JwtPayloadMapper";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
	@Inject()
	private jwtPayloadMapper: JwtPayloadMapper;

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

	async validate(jwtPaylodDto: JwtPaylod): Promise<AuthUser> {
		return this.jwtPayloadMapper.toAuthUser(jwtPaylodDto);
	}
}
