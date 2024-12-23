import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "src/modules/users/UserModule";

import { AuthController } from "./AuthController";
import { AuthGuard } from "./AuthGuard";
import { AuthService } from "./AuthService";

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
				secret: configService.get<string>("JWT_SECRET"),
				signOptions: { expiresIn: "60s" }
			})
		})
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		{
			provide: APP_GUARD,
			useClass: AuthGuard
		}
	],
	exports: [AuthService]
})
export class AuthModule {}
