import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import cookieParser from "cookie-parser";
import { AppModule } from "src/AppModule";
import { BusinessExceptionFilter } from "src/core/filters/BusinessExceptionFilter";
import { HttpExceptionFilter } from "src/core/filters/HttpExceptionFilter";
import { UnhandledExceptionFilter } from "src/core/filters/UnhandledExceptionFilter";
import { ResponseDelayInterceptor } from "src/core/interceptors/ResponseDelayInterceptor";
import {
	initializeTransactionalContext,
	StorageDriver
} from "typeorm-transactional";

async function createTestApp(): Promise<INestApplication> {
	initializeTransactionalContext({ storageDriver: StorageDriver.AUTO }); // Should be called before all
	const moduleFixture: TestingModule = await Test.createTestingModule({
		imports: [AppModule]
	}).compile();
	const app = moduleFixture.createNestApplication({});

	app.use(cookieParser());

	app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

	app.useGlobalInterceptors(new ResponseDelayInterceptor());

	app.useGlobalFilters(
		new UnhandledExceptionFilter(), // Should be the first one
		new HttpExceptionFilter(),
		new BusinessExceptionFilter()
	);

	await app.init();

	return app;
}

export default createTestApp;
