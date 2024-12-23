import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { TypeOrmModule } from "@nestjs/typeorm";

import { databaseConfig } from "./database/config";
import { AuthModule } from "./modules/auth/AuthModule";
import { RoleModule } from "./modules/role/RoleModule";
import { UserModule } from "./modules/user/UserModule";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		AuthModule,
		UserModule,
		ThrottlerModule.forRoot([
			{
				ttl: 60000,
				limit: 100
			}
		]),
		TypeOrmModule.forRootAsync(databaseConfig),
		RoleModule
	],
	controllers: [],
	providers: [
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard
		}
	]
})
export class AppModule {}
