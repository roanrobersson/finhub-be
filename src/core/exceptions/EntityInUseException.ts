import { BusinessException } from "./BusinessException";

export class EntityInUseException extends BusinessException {
	constructor(message: string, description: string) {
		super(message, description);
		this.name = "InUseException";
	}
}
