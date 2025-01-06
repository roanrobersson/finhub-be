import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import helmet from "helmet";
import {
	initializeTransactionalContext,
	StorageDriver
} from "typeorm-transactional";

import { AppModule } from "./AppModule";
import { BusinessExceptionFilter } from "./core/filters/BusinessExceptionFilter";
import { HttpExceptionFilter } from "./core/filters/HttpExceptionFilter";
import { UnhandledExceptionFilter } from "./core/filters/UnhandledExceptionFilter";

async function bootstrap() {
	initializeTransactionalContext({ storageDriver: StorageDriver.AUTO }); // Should be called before all

	const app = await NestFactory.create(AppModule);

	app.use(helmet());

	app.enableCors({
		origin: true,
		credentials: true
	});

	app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

	app.useGlobalFilters(
		new UnhandledExceptionFilter(), // Should be the first one
		new HttpExceptionFilter(),
		new BusinessExceptionFilter()
	);

	const config = new DocumentBuilder()
		.setTitle("FinHub")
		.setDescription("The FinHub API description")
		.setVersion("0.1")
		.addTag("FinHub")
		.addBearerAuth()
		.build();
	const documentFactory = () => SwaggerModule.createDocument(app, config);

	SwaggerModule.setup("api", app, documentFactory);

	await app.listen(process.env.PORT ?? 3000);

	console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
