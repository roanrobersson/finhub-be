import {
	ArgumentsHost,
	BadRequestException,
	Catch,
	ExceptionFilter,
	HttpException
} from "@nestjs/common";
import { Request, Response } from "express";

import { Problem, ProblemError } from "../Problem";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();

		// Default error handler
		if (exception instanceof HttpException) {
			const statusCode = exception.getStatus();
			const problem = new Problem();

			problem.statusCode = statusCode;
			problem.title = this.getTitle(exception);
			problem.description = this.getDescription(exception);
			problem.timeStamp = new Date().toISOString();
			problem.method = request.method;
			problem.path = request.url;
			problem.errors = this.getErrors(exception);

			response.status(statusCode).json(problem);
			return;
		}
	}

	private getTitle = (exception: HttpException): string => {
		const data = exception.getResponse();
		if (typeof data === "string") {
			return data;
		}
		if (
			typeof data === "object" &&
			"error" in data &&
			typeof data.error === "string"
		) {
			return data.error;
		}
		return "";
	};

	private getDescription = (exception: BadRequestException): string | null => {
		const data = exception.getResponse();
		if (typeof data === "string") {
			return data;
		}
		if (
			typeof data === "object" &&
			"message" in data &&
			typeof data.message === "string"
		) {
			return data.message;
		}
		return null;
	};

	private getErrors = (exception: BadRequestException): ProblemError[] => {
		const data = exception.getResponse();
		if (
			typeof data === "object" &&
			"message" in data &&
			Array.isArray(data.message)
		) {
			return data.message.map((message: string) => {
				return {
					field: message.split(" ")[0],
					message: message
						.split(" ")
						.filter((_, index) => index > 0)
						.join(" ")
				};
			});
		}
		return [];
	};
}
