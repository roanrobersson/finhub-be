import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { EnvVarEnum } from "src/core/enums/EnvVarEnum";
import { UserModule } from "src/modules/user/UserModule";

import { RoleModule } from "../role/RoleModule";
import { AuthController } from "./AuthController";
import { AuthService } from "./AuthService";
import { JwtAuthGuard } from "./guards/JwtAuthGuard";
import { RolesGuard } from "./guards/RolesGuard";
import { AuthUserMapper } from "./mappers/AuthRequestMapper";
import { JwtPayloadMapper } from "./mappers/JwtPayloadMapper";
import { SignUpMapper } from "./mappers/SignUpMapper";
import { UserMapper } from "./mappers/UserMapper";
import { GoogleStrategy } from "./strategies/GoogleStrategy";
import { JwtStrategy } from "./strategies/JwtStrategy";
import { LocalStrategy } from "./strategies/LocalStrategy";

@Module({
	imports: [
		UserModule,
		RoleModule,
		ConfigModule.forRoot({
			isGlobal: true
		}),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				secret: configService.get<string>(EnvVarEnum.JWT_SECRET),
				signOptions: {
					expiresIn: configService.get<string>(EnvVarEnum.JWT_EXPIRATION_TIME)
				}
			})
		})
	],
	controllers: [AuthController],
	providers: [
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard
		},
		{
			provide: APP_GUARD,
			useClass: RolesGuard
		},

		AuthService,

		LocalStrategy,
		JwtStrategy,
		GoogleStrategy,

		UserMapper,
		JwtPayloadMapper,
		SignUpMapper,
		AuthUserMapper
	],
	exports: [
		AuthService,

		UserMapper,
		JwtPayloadMapper,
		SignUpMapper,
		AuthUserMapper
	]
})
export class AuthModule {}
