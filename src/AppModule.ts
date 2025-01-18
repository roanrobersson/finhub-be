import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { addTransactionalDataSource } from "typeorm-transactional";

import { Permission } from "../src/modules/permission/PermissionEntity";
import { Role } from "../src/modules/role/RoleEntity";
import { User } from "../src/modules/user/UserEntity";
import { AppController } from "./AppController";
import { AuthModule } from "./modules/auth/AuthModule";
import { EmailModule } from "./modules/email/EmailModule";
import { PermissionModule } from "./modules/permission/PermissionModule";
import { RoleModule } from "./modules/role/RoleModule";
import { Tag } from "./modules/tag/TagEntity";
import { TagModule } from "./modules/tag/TagModule";
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
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				type: "postgres",
				url: configService.get<string>("DB_URL"),
				logging: Boolean(configService.get<boolean>("DB_LOGGING", false)),
				entities: [User, Permission, Role, Tag]
			}),
			async dataSourceFactory(options) {
				if (!options) {
					throw new Error("Invalid options passed");
				}
				return addTransactionalDataSource(new DataSource(options));
			}
		}),
		AuthModule,
		UserModule,
		RoleModule,
		PermissionModule,
		EmailModule,
		TagModule
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
