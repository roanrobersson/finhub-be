import { BusinessException } from "./BusinessException";

export class InUseException extends BusinessException {
	constructor(message: string) {
		super(message);
		this.name = "InUseException";
	}
}
