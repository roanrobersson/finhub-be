import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpStatus
} from "@nestjs/common";
import { Request, Response } from "express";

import { BusinessException } from "./exceptions/BusinessException";
import { InUseException } from "./exceptions/InUseException";
import { NotFoundException } from "./exceptions/NotFoundException";
import { UniqueException } from "./exceptions/UniqueException";
import { Problem } from "./Problem";
import { ProblemTypeEnum } from "./ProblemType";

@Catch(BusinessException)
export class ControllerExceptionFilter implements ExceptionFilter {
	catch(exception: BusinessException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();

		if (exception instanceof UniqueException) {
			const status = HttpStatus.CONFLICT;
			const problem = new Problem();
			problem.status = status;
			problem.type = ProblemTypeEnum.UNIQUE_CONSTRAINT;
			problem.title = "Resource already exists";
			problem.detail = exception.message;
			problem.timeStamp = new Date().toISOString();
			problem.method = request.method;
			problem.path = request.url;
			response.status(status).json(problem);
			return;
		}

		if (exception instanceof NotFoundException) {
			const status = HttpStatus.NOT_FOUND;
			const problem = new Problem();
			problem.status = status;
			problem.type = ProblemTypeEnum.RESOURCE_NOT_FOUND;
			problem.title = "Resource not found";
			problem.detail = exception.message;
			problem.timeStamp = new Date().toISOString();
			problem.method = request.method;
			problem.path = request.url;
			response.status(status).json(problem);
			return;
		}

		if (exception instanceof InUseException) {
			const status = HttpStatus.CONFLICT;
			const problem = new Problem();
			problem.status = status;
			problem.type = ProblemTypeEnum.RESOURCE_IN_USE;
			problem.title = "Resource in use";
			problem.detail = exception.message;
			problem.timeStamp = new Date().toISOString();
			problem.method = request.method;
			problem.path = request.url;
			response.status(status).json(problem);
			return;
		}
	}
}
