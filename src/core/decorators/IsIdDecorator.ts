import { Type } from "class-transformer";
import { IsPositive } from "class-validator";

export const IsId = () => {
	return function (target: any, propertyKey: string) {
		Type(() => Number)(target, propertyKey);
		IsPositive()(target, propertyKey);
	};
};
