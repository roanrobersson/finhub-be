export function withTimestamp(str: string) {
	return `${str}_${Date.now()}`;
}

export function emailWithTimestamp(str: string) {
	const emailArr = str.split("@");
	return `${withTimestamp(emailArr[0])}@${emailArr[1]}`;
}

export function sleep(value: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, value));
}
