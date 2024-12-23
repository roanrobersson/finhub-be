import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { SeederOptions } from "typeorm-extension";

import { Permission } from "../modules/role/PermissionEntity";
import { Role } from "../modules/role/RoleEntity";
import { User } from "../modules/user/UserEntity";

export const databaseConfig = {
	imports: [ConfigModule],
	inject: [ConfigService],
	useFactory: (configService: ConfigService) => ({
		type: "postgres",
		host: configService.get<string>("DB_HOST"),
		port: configService.get<number>("DB_PORT"),
		username: configService.get<string>("DB_USERNAME"),
		password: configService.get<string>("DB_PASSWORD"),
		database: configService.get<string>("DB_NAME"),
		synchronize: configService.get<boolean>("DB_SYNC", false),
		entities: [User, Permission, Role]
	})
} satisfies TypeOrmModuleAsyncOptions & SeederOptions;
