import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpStatus
} from "@nestjs/common";
import { Request, Response } from "express";

import { Problem } from "../Problem";

@Catch()
export class UnhandledExceptionFilter implements ExceptionFilter {
	catch(exception: Error, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();
		const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
		const problem = new Problem();

		problem.statusCode = statusCode;
		problem.title = "Internal server error";
		problem.description =
			"An unexpected error occurred in the system. Try again and if the problem persists, contact the system administrator.";
		problem.timeStamp = new Date().toISOString();
		problem.method = request.method;
		problem.path = request.url;

		response.status(statusCode).json(problem);
	}
}
