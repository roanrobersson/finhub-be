import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpStatus
} from "@nestjs/common";
import { Request, Response } from "express";

import { BusinessException } from "../exceptions/BusinessException";
import { EntityInUseException } from "../exceptions/EntityInUseException";
import { EntityNotFoundException } from "../exceptions/EntityNotFoundException";
import { UniqueException } from "../exceptions/UniqueException";
import { Problem } from "../Problem";

@Catch(BusinessException)
export class BusinessExceptionFilter implements ExceptionFilter {
	catch(exception: BusinessException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();

		if (exception instanceof UniqueException) {
			const statusCode = HttpStatus.CONFLICT;
			const problem = new Problem();
			problem.statusCode = statusCode;
			problem.title = "Resource already exists";
			problem.description = exception.message;
			problem.timeStamp = new Date().toISOString();
			problem.method = request.method;
			problem.path = request.url;

			response.status(statusCode).json(problem);
			return;
		}

		if (exception instanceof EntityNotFoundException) {
			const statusCode = HttpStatus.NOT_FOUND;
			const problem = new Problem();

			problem.statusCode = statusCode;
			problem.title = "Entity not found";
			problem.description = exception.message;
			problem.timeStamp = new Date().toISOString();
			problem.method = request.method;
			problem.path = request.url;

			response.status(statusCode).json(problem);
			return;
		}

		if (exception instanceof EntityInUseException) {
			const statusCode = HttpStatus.CONFLICT;
			const problem = new Problem();

			problem.statusCode = statusCode;
			problem.title = "Enity in use";
			problem.description = exception.message;
			problem.timeStamp = new Date().toISOString();
			problem.method = request.method;
			problem.path = request.url;

			response.status(statusCode).json(problem);
			return;
		}

		// Default exception handler
		if (exception instanceof BusinessException) {
			const statusCode = HttpStatus.BAD_REQUEST;
			const problem = new Problem();

			problem.statusCode = statusCode;
			problem.title = "Business rule violation";
			problem.description = exception.message;
			problem.timeStamp = new Date().toISOString();
			problem.method = request.method;
			problem.path = request.url;

			response.status(statusCode).json(problem);
			return;
		}
	}
}
