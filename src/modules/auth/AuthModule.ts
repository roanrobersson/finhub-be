import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { EnvVarEnum } from "src/core/enums/EnvVarEnum";
import { UserModule } from "src/modules/user/UserModule";

import { AuthController } from "./AuthController";
import { AuthService } from "./AuthService";
import { JwtAuthGuard } from "./JwtAuthGuard";
import { JwtStrategy } from "./JwtStrategy";
import { LocalStrategy } from "./LocalStrategy";
import { RolesGuard } from "./RolesGuard";

@Module({
	imports: [
		UserModule,
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
		AuthService,
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard
		},
		{
			provide: APP_GUARD,
			useClass: RolesGuard
		},
		LocalStrategy,
		JwtStrategy
	],
	exports: [AuthService]
})
export class AuthModule {}
