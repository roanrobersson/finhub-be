import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import helmet from "helmet";

import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.use(helmet());

	app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

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
}
bootstrap();
