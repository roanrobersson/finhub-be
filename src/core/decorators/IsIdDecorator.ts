import { IsNumberString } from "class-validator";

export const IsId = () => {
	return function (target: any, propertyKey: string) {
		IsNumberString()(target, propertyKey);
	};
};
