import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { User } from "src/modules/users/UserEntity";
import { SeederOptions } from "typeorm-extension";

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
		entities: [User],
		synchronize: configService.get<boolean>("DB_SYNC", false)
	})
} satisfies TypeOrmModuleAsyncOptions & SeederOptions;
