import { applyDecorators } from "@nestjs/common";
import {
	ApiCreatedResponse,
	ApiForbiddenResponse,
	ApiInternalServerErrorResponse,
	ApiNoContentResponse,
	ApiOkResponse,
	ApiResponseNoStatusOptions,
	ApiTooManyRequestsResponse,
	ApiUnauthorizedResponse
} from "@nestjs/swagger";

type ApiResponseOptions = ApiResponseNoStatusOptions & {
	public?: boolean;
	noRoleGuard?: boolean;
};

export function ApiDefaultGetAllResponse(options?: ApiResponseOptions) {
	return applyDecorators(
		ApiOkResponse({
			description: "The records have been successfully retrieved.",
			...options
		}),
		ApiDefaultResponse({ public: options?.public })
	);
}

export function ApiDefaultGetResponse(options?: ApiResponseOptions) {
	return applyDecorators(
		ApiOkResponse({
			description: "The information has been successfully retrieved.",
			...options
		}),
		ApiDefaultResponse({ public: options?.public })
	);
}

export function ApiDefaultGetByIdResponse(options?: ApiResponseOptions) {
	return applyDecorators(
		ApiOkResponse({
			description: "The record has been successfully retrieved.",
			...options
		}),
		ApiDefaultResponse({ public: options?.public })
	);
}

export function ApiDefaultCreateResponse(options?: ApiResponseOptions) {
	return applyDecorators(
		ApiCreatedResponse({
			description: "The record has been successfully created.",
			...options
		}),
		ApiDefaultResponse({ public: options?.public })
	);
}

export function ApiDefaultUpdateResponse(options?: ApiResponseOptions) {
	return applyDecorators(
		ApiOkResponse({
			description: "The record has been successfully updated.",
			...options
		}),
		ApiDefaultResponse({ public: options?.public })
	);
}

export function ApiDefaultActionResponse(options?: ApiResponseOptions) {
	return applyDecorators(
		ApiOkResponse({
			description: "The action has been successfully executed.",
			...options
		}),
		ApiDefaultResponse({ public: options?.public })
	);
}

export function ApiDefaultDeleteResponse(options?: ApiResponseOptions) {
	return applyDecorators(
		ApiNoContentResponse({
			description: "The record has been successfully removed.",
			...options
		}),
		ApiDefaultResponse({ public: options?.public })
	);
}

export function ApiDefaultResponse(options?: ApiResponseOptions) {
	const isPublic = options?.public ?? false;
	const noRoleGuard = options?.noRoleGuard ?? false;

	return applyDecorators(
		ApiTooManyRequestsResponse({ description: "Too Many Requests" }),
		!isPublic
			? ApiUnauthorizedResponse({ description: "Unauthorized" })
			: () => {},
		!isPublic && !noRoleGuard
			? ApiForbiddenResponse({ description: "Forbidden" })
			: () => {},
		ApiInternalServerErrorResponse({
			description: "Internal Server Error"
		})
	);
}
