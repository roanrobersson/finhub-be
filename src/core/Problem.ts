import { ProblemTypeEnum } from "./ProblemType";

export class Problem {
	status: number;
	type: ProblemTypeEnum;
	title: string;
	detail: string;
	timeStamp: string;
	method: string;
	path: string;
}
