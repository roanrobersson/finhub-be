import { BusinessException } from "./BusinessException";

export class UniqueException extends BusinessException {
	constructor(message) {
		super(message);
		this.name = "UniqueException";
	}
}
