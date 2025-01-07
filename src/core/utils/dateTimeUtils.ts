import ms, { StringValue } from "ms";

export const timespanToMilliseconds = (value: StringValue): number => {
	return ms(value);
};
