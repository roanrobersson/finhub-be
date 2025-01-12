import ms, { StringValue } from "ms";

export function timespanToMilliseconds(value: StringValue): number {
	return ms(value);
}
