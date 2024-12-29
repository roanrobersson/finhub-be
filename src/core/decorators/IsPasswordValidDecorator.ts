import { Type } from "class-transformer";
import { MinLength } from "class-validator";

export const IsPassword = () => {
	return function (target: any, propertyKey: string) {
		Type(() => String)(target, propertyKey);
		MinLength(8)(target, propertyKey);
	};
};
