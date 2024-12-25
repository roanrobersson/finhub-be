import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { DrizzleModule } from "database/DrizzleModule";

import { AppController } from "./AppController";
import { AuthModule } from "./modules/auth/AuthModule";
import { PermissionModule } from "./modules/permission/PermissionModule";
import { RoleModule } from "./modules/role/RoleModule";
import { UserModule } from "./modules/user/UserModule";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		ThrottlerModule.forRoot([
			{
				ttl: 60000,
				limit: 100
			}
		]),
		DrizzleModule,
		AuthModule,
		PermissionModule,
		RoleModule,
		UserModule
	],
	controllers: [AppController],
	providers: [
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard
		}
	]
})
export class AppModule {}
