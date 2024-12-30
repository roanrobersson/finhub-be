import { IsString, MinLength } from "class-validator";

export const IsPassword = () => {
	return function (target: any, propertyKey: string) {
		IsString()(target, propertyKey);
		MinLength(8)(target, propertyKey);
	};
};
