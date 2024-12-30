import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import { addTransactionalDataSource } from "typeorm-transactional";

import { Permission } from "../src/modules/permission/PermissionEntity";
import { Role } from "../src/modules/role/RoleEntity";
import { User } from "../src/modules/user/UserEntity";

export const databaseConfig = {
	imports: [ConfigModule],
	inject: [ConfigService],
	useFactory: (configService: ConfigService) => ({
		type: "postgres",
		url: configService.get<string>("DB_URL"),
		synchronize: Boolean(configService.get<boolean>("DB_SYNC", false)),
		logging: Boolean(configService.get<boolean>("DB_LOGGING", false)),
		entities: [User, Permission, Role]
	}),
	async dataSourceFactory(options) {
		if (!options) {
			throw new Error("Invalid options passed");
		}
		return addTransactionalDataSource(new DataSource(options));
	}
} satisfies TypeOrmModuleAsyncOptions & SeederOptions;
