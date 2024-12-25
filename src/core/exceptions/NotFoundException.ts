import { BusinessException } from "./BusinessException";

export class NotFoundException extends BusinessException {
	constructor(message: string) {
		super(message);
		this.name = "NotFoundException";
	}
}
