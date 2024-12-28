import { BusinessException } from "./BusinessException";

export class UniqueException extends BusinessException {
	constructor(message: string, description?: string) {
		super(message, description);
		this.name = "UniqueException";
	}
}
