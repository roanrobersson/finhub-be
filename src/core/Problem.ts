export class Problem {
	statusCode: number;
	title: string;
	description: string | null = null;
	timeStamp: string;
	method: string;
	path: string;
	errors: ProblemError[] = [];
}

export class ProblemError {
	field: string;
	message: string;
}
